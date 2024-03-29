import { breadth } from 'treeverse'
import type {
  QueryResolvers,
  MutationResolvers,
  ProjectExpenseResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import {
  generateTree,
  isArrayOfLinks,
  isArrayOfStrings,
  isNumeric,
} from 'src/lib/helpers'

// Helpers
function searchTree(
  tree: ReturnType<typeof generateTree>,
  searchId: string
): ReturnType<typeof generateTree>[number] | null {
  for (const projectExpenseTree of tree) {
    if (projectExpenseTree.id === searchId) {
      return projectExpenseTree
    } else if (projectExpenseTree.children.length > 0) {
      let result = null
      for (const child of projectExpenseTree.children) {
        result = searchTree(child as any, searchId)
      }
      return result
    }
  }

  return null
}

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
      throw new ValidationError('You must be logged in to update a project')
    }

    const project = await db.project.findFirst({
      where: {
        id: input.projectId,
        userId,
      },
    })
    if (!project) {
      throw new ValidationError(
        'Project with this ID does not exist or is now owned by the current user'
      )
    }

    validate(input.name, {
      length: {
        min: 2,
        max: 255,
        message: 'Name needs to be between 2 and 255 characters long',
      },
    })

    if (
      isNumeric(input.costRangeFrom) &&
      isNumeric(input.costRangeTo) &&
      input.costRangeTo < input.costRangeFrom
    ) {
      throw new ValidationError(
        'The cost to value must be higher than the cost from value'
      )
    }

    if (!isArrayOfStrings(input.tags)) {
      throw new ValidationError('The tags must be an array of strings')
    }

    if (!isArrayOfLinks(input.links)) {
      throw new ValidationError('All links are required and must be valid')
    }

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
      throw new ValidationError('You must be logged in to update a project')
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
      throw new ValidationError('Project expense with this ID does not exist')
    }

    if (
      isNumeric(input.costRangeFrom) &&
      isNumeric(input.costRangeTo) &&
      input.costRangeTo < input.costRangeFrom
    ) {
      throw new ValidationError(
        'The cost to value must be higher than the cost from value'
      )
    }

    if (typeof input.tags !== 'undefined' && !isArrayOfStrings(input.tags)) {
      throw new ValidationError('The tags must be an array of strings')
    }

    if (typeof input.links !== 'undefined' && !isArrayOfLinks(input.links)) {
      throw new ValidationError('All links are required and must be valid')
    }

    if (input.parentId) {
      if (input.parentId === projectExpense.id) {
        throw new ValidationError(
          'You can not set the parent expense to itself'
        )
      }

      const projectExpenses = await db.projectExpense.findMany({
        where: {
          projectId: id,
        },
      })
      const projectExpensesTree = generateTree(projectExpenses as any)
      const currentProjectTree = searchTree(projectExpensesTree, input.parentId)

      const childIds: string[] = []
      await breadth({
        tree: { id: 'root', children: [currentProjectTree] },
        getChildren: (node) => node?.children || [],
        visit: async (node) => {
          if (node) {
            childIds.push(node.id)
          }
        },
      })

      if (childIds.includes(input.parentId)) {
        throw new ValidationError('The parent can not be set a child of itself')
      }
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
    } else {
      input.order = await db.projectExpense.count({
        where: {
          projectId: input.projectId,
        },
      })
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
      throw new ValidationError('You must be logged in to update a project')
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
      throw new ValidationError('Project expense with this ID does not exist')
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
