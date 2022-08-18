import type {
  QueryResolvers,
  MutationResolvers,
  ProjectVariableResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

export const projectVariables: QueryResolvers['projectVariables'] = () => {
  return db.projectVariable.findMany()
}

export const projectVariable: QueryResolvers['projectVariable'] = ({ id }) => {
  return db.projectVariable.findUnique({
    where: { id },
  })
}

export const createProjectVariable: MutationResolvers['createProjectVariable'] =
  ({ input }) => {
    return db.projectVariable.create({
      data: input,
    })
  }

export const updateProjectVariable: MutationResolvers['updateProjectVariable'] =
  ({ id, input }) => {
    return db.projectVariable.update({
      data: input,
      where: { id },
    })
  }

export const deleteProjectVariable: MutationResolvers['deleteProjectVariable'] =
  ({ id }) => {
    return db.projectVariable.delete({
      where: { id },
    })
  }

export const ProjectVariable: ProjectVariableResolvers = {
  project: (_obj, { root }) =>
    db.projectVariable.findUnique({ where: { id: root.id } }).project(),
}
