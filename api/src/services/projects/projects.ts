import currenciesMap from 'currency-symbol-map/map'
import type {
  QueryResolvers,
  MutationResolvers,
  ProjectResolvers,
  CreateProjectInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'

import { db } from 'src/lib/db'

export const projects: QueryResolvers['projects'] = () => {
  const userId = context.currentUser?.id
  if (!userId) {
    return []
  }

  return db.project.findMany({
    where: {
      userId,
    },
  })
}

export const project: QueryResolvers['project'] = ({ id }) => {
  return db.project.findUnique({
    where: { id },
  })
}

export const createProject: MutationResolvers['createProject'] = ({
  input,
}) => {
  const userId = context.currentUser?.id
  if (!userId) {
    throw 'You must be logged in to create a project'
  }

  validate(input.currencySymbol, {
    inclusion: {
      in: Object.keys(currenciesMap),
      message: 'Invalid currency symbol',
    },
  })

  validateWith(() => {
    if (input.categoryId) {
      const category = db.category.findUnique({
        where: {
          id: input.categoryId,
        },
      })
      if (!category) {
        throw 'Category with this ID does not exist'
      }
    }
  })

  const data: CreateProjectInput = {
    name: input.name,
    description: input.description,
    currencySymbol: input.currencySymbol,
    costEstimated: input.costEstimated,
    isPublic: input.isPublic ?? false,
    userId,
    categoryId: input.categoryId,
  }

  return db.project.create({
    data,
  })
}

export const updateProject: MutationResolvers['updateProject'] = ({
  id,
  input,
}) => {
  const userId = context.currentUser?.id
  if (!userId) {
    throw 'You must be logged in to update a project'
  }

  const project = db.project.findFirst({
    where: {
      id,
      userId,
    },
  })
  if (!project) {
    throw 'Project with this ID does not exist'
  }

  return db.project.update({
    data: input,
    where: { id },
  })
}

export const deleteProject: MutationResolvers['deleteProject'] = ({ id }) => {
  const userId = context.currentUser?.id
  if (!userId) {
    throw 'You must be logged in to delete a project'
  }

  const project = db.project.findFirst({
    where: {
      id,
      userId,
    },
  })
  if (!project) {
    throw 'Project with this ID does not exist'
  }

  return db.project.delete({
    where: { id },
  })
}

export const Project: ProjectResolvers = {
  category: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).category(),
  user: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).user(),
  projectVariables: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).projectVariables(),
  projectExpenses: (_obj, { root }) =>
    db.project.findUnique({ where: { id: root.id } }).projectExpenses(),
}
