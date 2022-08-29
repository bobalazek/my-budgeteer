import currenciesMap from 'currency-symbol-map/map'
import { breadth } from 'treeverse'
import type {
  QueryResolvers,
  MutationResolvers,
  ProjectResolvers,
  CreateProjectInput,
} from 'types/graphql'

import { validate, validateWith } from '@redwoodjs/api'
import { ValidationError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'
import { generateTree } from 'src/lib/helpers'

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

export const projectTemplates: QueryResolvers['projectTemplates'] = () => {
  const userId = context.currentUser?.id
  if (!userId) {
    return []
  }

  return db.project.findMany({
    where: {
      userId: null,
      isTemplate: true,
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
    throw new ValidationError('You must be logged in to create a project')
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
        throw new ValidationError('Category with this ID does not exist')
      }
    }
  })

  const data: CreateProjectInput = {
    name: input.name,
    description: input.description,
    currencySymbol: input.currencySymbol,
    costEstimated: input.costEstimated,
    isPublic: input.isPublic || false,
    isTemplate: input.isTemplate || false,
    userId,
    categoryId: input.categoryId,
  }

  return db.project.create({
    data,
  })
}

export const updateProject: MutationResolvers['updateProject'] = async ({
  id,
  input,
}) => {
  const userId = context.currentUser?.id
  if (!userId) {
    throw new ValidationError('You must be logged in to update a project')
  }

  const project = await db.project.findFirst({
    where: {
      id,
      userId,
    },
  })
  if (!project) {
    throw new ValidationError('Project with this ID does not exist')
  }

  return db.project.update({
    data: input,
    where: { id },
  })
}

export const cloneProject: MutationResolvers['cloneProject'] = async ({
  id,
  input,
}) => {
  const userId = context.currentUser?.id
  if (!userId) {
    throw new ValidationError('You must be logged in to delete a project')
  }

  const project = await db.project.findFirst({
    where: {
      id,
    },
  })
  if (!project) {
    throw new ValidationError('Project with this ID does not exist')
  }

  const projectVariables = await db.projectVariable.findMany({
    where: {
      projectId: id,
    },
  })
  const projectExpenses = await db.projectExpense.findMany({
    where: {
      projectId: id,
    },
  })

  const { id: _, createdAt: __, updatedAt: ___, ...rawProject } = project

  const clonedProject = await db.project.create({
    data: { ...rawProject, ...input, userId },
  })

  await db.projectVariable.createMany({
    data: projectVariables.map((projectVariable) => {
      const { id: _, ...rawProjectVariable } = projectVariable
      return {
        ...rawProjectVariable,
        projectId: clonedProject.id,
        createdAt: undefined,
        updatedAt: undefined,
      }
    }),
  })

  // TODO: optimize this bit
  const projectExpensesMap = new Map()
  const projectExpensesParentMap = new Map()
  projectExpenses.forEach((projectExpense) => {
    projectExpensesMap.set(projectExpense.id, projectExpense)
    projectExpensesParentMap.set(projectExpense.id, projectExpense.parentId)
  })

  await breadth({
    tree: { id: 'root', children: generateTree(projectExpenses as any) },
    getChildren: (node) => node.children,
    visit: async (node) => {
      const projectExpense = projectExpensesMap.get(node.id)
      if (projectExpense) {
        const { id: projectExpenseId, ...rawProjectExpense } = projectExpense
        const parentId = projectExpensesParentMap.get(projectExpenseId)

        const clonedProjectExpense = await db.projectExpense.create({
          data: {
            ...rawProjectExpense,
            parentId,
            projectId: clonedProject.id,
            note: undefined,
            costActual: undefined,
            progressPercentage: undefined,
            createdAt: undefined,
            updatedAt: undefined,
          },
        })

        // The subsequent children now have a different parent, so let's replace it!
        projectExpensesParentMap.forEach(
          (mapProjectExpenseParentId, mapProjectExpenseId) => {
            if (projectExpenseId === mapProjectExpenseParentId) {
              projectExpensesParentMap.set(
                mapProjectExpenseId,
                clonedProjectExpense.id
              )
            }
          }
        )
      }
    },
  })

  return db.project.findUnique({
    where: { id: clonedProject.id },
  })
}

export const deleteProject: MutationResolvers['deleteProject'] = async ({
  id,
}) => {
  const userId = context.currentUser?.id
  if (!userId) {
    throw new ValidationError('You must be logged in to delete a project')
  }

  const project = await db.project.findFirst({
    where: {
      id,
      userId,
    },
  })
  if (!project) {
    throw new ValidationError('Project with this ID does not exist')
  }

  await db.projectVariable.deleteMany({
    where: { projectId: id },
  })

  await db.projectExpense.deleteMany({
    where: { projectId: id },
  })

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
