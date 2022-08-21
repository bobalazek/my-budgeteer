import type {
  QueryResolvers,
  MutationResolvers,
  ProjectVariableResolvers,
} from 'types/graphql'

import { validate } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const projectVariables: QueryResolvers['projectVariables'] = ({
  projectId,
}) => {
  return db.projectVariable.findMany({
    where: {
      projectId,
    },
  })
}

export const projectVariable: QueryResolvers['projectVariable'] = ({ id }) => {
  return db.projectVariable.findUnique({
    where: { id },
  })
}

export const createProjectVariable: MutationResolvers['createProjectVariable'] =
  ({ input }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const project = db.project.findFirst({
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

    validate(input.value, {
      length: {
        min: 1,
        message: 'Please set a value',
      },
    })

    return db.projectVariable.create({
      data: input,
    })
  }

export const updateProjectVariable: MutationResolvers['updateProjectVariable'] =
  ({ id, input }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const project = db.project.findFirst({
      where: {
        id: input.projectId,
        userId,
      },
    })
    if (!project) {
      throw 'Project with this ID does not exist'
    }

    return db.projectVariable.update({
      data: input,
      where: { id },
    })
  }

export const deleteProjectVariable: MutationResolvers['deleteProjectVariable'] =
  ({ id }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const projectVariable = db.projectVariable.findFirst({
      where: {
        id,
        project: {
          userId,
        },
      },
    })
    if (!projectVariable) {
      throw 'Project variable with this ID does not exist'
    }

    return db.projectVariable.delete({
      where: { id },
    })
  }

export const ProjectVariable: ProjectVariableResolvers = {
  project: (_obj, { root }) =>
    db.projectVariable.findUnique({ where: { id: root.id } }).project(),
}
