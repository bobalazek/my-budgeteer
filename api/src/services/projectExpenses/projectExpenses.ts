import type {
  QueryResolvers,
  MutationResolvers,
  ProjectExpenseResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const projectExpenses: QueryResolvers['projectExpenses'] = ({
  projectId,
}) => {
  return db.projectExpense.findMany({
    where: {
      projectId,
    },
    orderBy: {
      order: 'asc',
    },
  })
}

export const projectExpense: QueryResolvers['projectExpense'] = ({ id }) => {
  return db.projectExpense.findUnique({
    where: { id },
  })
}

export const createProjectExpense: MutationResolvers['createProjectExpense'] =
  async ({ input }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const project = await db.project.findFirst({
      where: {
        id: input.projectId,
        userId,
      },
    })
    if (!project) {
      throw 'Project with this ID does not exist'
    }

    validate(input.name, {
      length: {
        min: 2,
        max: 255,
        message: 'Name needs to be between 2 and 255 characters long',
      },
    })

    const parentId = input.parentId || null
    const order = await db.projectExpense.count({
      where: {
        projectId: input.projectId,
        parentId,
      },
    })
    const data = {
      ...input,
      isArchived: false,
      parentId,
      order,
    }

    return db.projectExpense.create({
      data,
    })
  }

export const updateProjectExpense: MutationResolvers['updateProjectExpense'] =
  async ({ id, input }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const project = await db.project.findFirst({
      where: {
        id: input.projectId,
        userId,
      },
    })
    if (!project) {
      throw 'Project with this ID does not exist'
    }

    const projectExpense = await db.projectExpense.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })
    if (!projectExpense) {
      throw 'Project expense with this ID does not exist'
    }

    const transactionPromises = []
    if (
      typeof input.order !== 'undefined' &&
      input.order !== projectExpense.order
    ) {
      transactionPromises.push(
        db.projectExpense.updateMany({
          data: {
            order: projectExpense.order,
          },
          where: {
            projectId: projectExpense.projectId,
            parentId: projectExpense.parentId,
            order: input.order,
          },
        })
      )
    }
    transactionPromises.push(
      db.projectExpense.update({
        data: input,
        where: { id },
      })
    )

    await db.$transaction(transactionPromises)

    return db.projectExpense.findUnique({ where: { id: projectExpense.id } })
  }

export const deleteProjectExpense: MutationResolvers['deleteProjectExpense'] =
  async ({ id }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const projectExpense = await db.projectExpense.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })
    if (!projectExpense) {
      throw 'Project expense with this ID does not exist'
    }

    const children = await db.projectExpense.findMany({
      where: {
        parentId: projectExpense.id,
      },
    })
    if (children.length) {
      await db.projectExpense.updateMany({
        data: {
          parentId: projectExpense.parentId,
        },
        where: {
          id: {
            in: children.map((child) => {
              return child.id
            }),
          },
        },
      })
    }

    const transactionPromises = []
    transactionPromises.push(
      db.projectExpense.updateMany({
        where: {
          projectId: projectExpense.projectId,
          parentId: projectExpense.parentId,
          order: {
            gt: projectExpense.order,
          },
        },
        data: {
          order: {
            decrement: 1,
          },
        },
      })
    )
    transactionPromises.push(
      db.projectExpense.delete({
        where: { id },
      })
    )

    await db.$transaction(transactionPromises)

    return {
      id,
    }
  }

export const ProjectExpense: ProjectExpenseResolvers = {
  project: (_obj, { root }) =>
    db.projectExpense.findUnique({ where: { id: root.id } }).project(),
  parent: (_obj, { root }) =>
    db.projectExpense.findUnique({ where: { id: root.id } }).parent(),
  children: (_obj, { root }) =>
    db.projectExpense.findUnique({ where: { id: root.id } }).children(),
}
