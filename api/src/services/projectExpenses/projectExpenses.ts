import type {
  QueryResolvers,
  MutationResolvers,
  ProjectExpenseResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const projectExpenses: QueryResolvers['projectExpenses'] = () => {
  return db.projectExpense.findMany()
}

export const projectExpense: QueryResolvers['projectExpense'] = ({ id }) => {
  return db.projectExpense.findUnique({
    where: { id },
  })
}

export const createProjectExpense: MutationResolvers['createProjectExpense'] =
  ({ input }) => {
    return db.projectExpense.create({
      data: input,
    })
  }

export const updateProjectExpense: MutationResolvers['updateProjectExpense'] =
  ({ id, input }) => {
    return db.projectExpense.update({
      data: input,
      where: { id },
    })
  }

export const deleteProjectExpense: MutationResolvers['deleteProjectExpense'] =
  ({ id }) => {
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
