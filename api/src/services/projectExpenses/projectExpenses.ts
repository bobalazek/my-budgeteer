import type {
  QueryResolvers,
  MutationResolvers,
  ProjectExpenseResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const projectExpenses: QueryResolvers['projectExpenses'] = ({
  projectId,
}) => {
  return db.projectExpense.findMany({
    where: {
      projectId,
    },
  })
}

export const projectExpense: QueryResolvers['projectExpense'] = ({ id }) => {
  return db.projectExpense.findUnique({
    where: { id },
  })
}

export const createProjectExpense: MutationResolvers['createProjectExpense'] =
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

    return db.projectExpense.create({
      data: input,
    })
  }

export const updateProjectExpense: MutationResolvers['updateProjectExpense'] =
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

    return db.projectExpense.update({
      data: input,
      where: { id },
    })
  }

export const deleteProjectExpense: MutationResolvers['deleteProjectExpense'] =
  ({ id }) => {
    const userId = context.currentUser?.id
    if (!userId) {
      throw 'You must be logged in to update a project'
    }

    const projectExpense = db.projectExpense.findFirst({
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

    return db.projectExpense.delete({
      where: { id },
    })
  }

export const ProjectExpense: ProjectExpenseResolvers = {
  project: (_obj, { root }) =>
    db.projectExpense.findUnique({ where: { id: root.id } }).project(),
  parent: (_obj, { root }) =>
    db.projectExpense.findUnique({ where: { id: root.id } }).parent(),
  children: (_obj, { root }) =>
    db.projectExpense.findUnique({ where: { id: root.id } }).children(),
}
