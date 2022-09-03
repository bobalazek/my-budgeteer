import type {
  QueryResolvers,
  MutationResolvers,
  ProjectVariableResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'
import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

export const projectVariables: QueryResolvers['projectVariables'] = ({
  projectId,
}) => {
  return db.projectVariable.findMany({
    where: {
      projectId,
    },
    orderBy: {
      order: 'asc',
    },
  })
}

export const projectVariable: QueryResolvers['projectVariable'] = ({ id }) => {
  return db.projectVariable.findUnique({
    where: { id },
  })
}

export const createProjectVariable: MutationResolvers['createProjectVariable'] =
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
      throw new ValidationError('Project with this ID does not exist')
    }

    validate(input.name, {
      length: {
        min: 2,
        max: 255,
        message: 'Name needs to be between 2 and 255 characters long',
      },
    })

    validate(input.type, {
      inclusion: {
        in: ['string'],
        message: 'Invalid type',
      },
    })

    validate(input.value, {
      length: {
        min: 1,
        message: 'Please set a value',
      },
    })

    const order = await db.projectVariable.count({
      where: {
        projectId: input.projectId,
      },
    })
    const data = {
      ...input,
      order,
    }

    return db.projectVariable.create({
      data,
    })
  }

export const updateProjectVariable: MutationResolvers['updateProjectVariable'] =
  async ({ id, input }) => {
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
      throw new ValidationError('Project with this ID does not exist')
    }

    validate(input.name, {
      length: {
        min: 2,
        max: 255,
        message: 'Name needs to be between 2 and 255 characters long',
      },
    })

    validate(input.type, {
      inclusion: {
        in: ['string'],
        message: 'Invalid type',
      },
    })

    validate(input.value, {
      length: {
        min: 1,
        message: 'Please set a value',
      },
    })

    return db.projectVariable.update({
      data: input,
      where: { id },
    })
  }

export const deleteProjectVariable: MutationResolvers['deleteProjectVariable'] =
  async ({ id }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw new ValidationError('You must be logged in to update a project')
    }

    const projectVariable = await db.projectVariable.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })
    if (!projectVariable) {
      throw new ValidationError('Project variable with this ID does not exist')
    }

    const transactionPromises = []
    transactionPromises.push(
      db.projectVariable.updateMany({
        where: {
          projectId: projectVariable.projectId,
          order: {
            gt: projectVariable.order,
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
      db.projectVariable.delete({
        where: { id },
      })
    )

    await db.$transaction(transactionPromises)

    return {
      id,
    }
  }

export const ProjectVariable: ProjectVariableResolvers = {
  project: (_obj, { root }) =>
    db.projectVariable.findUnique({ where: { id: root.id } }).project(),
}
