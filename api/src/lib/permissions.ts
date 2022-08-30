import { db } from './db'

export const getProjectPermissions = (
  project: Awaited<ReturnType<typeof db.project.findFirst>>
) => {
  const userId = context.currentUser?.id
  const allowRead = project.isPublic || project.userId === userId
  const allowUpdate = project.userId === userId
  const allowDelete = project.userId === userId
  const allowClone = project.userId === userId || project.isTemplate
  const allowCreate = project.userId === userId

  return {
    allowRead,
    allowUpdate,
    allowDelete,
    allowClone,
    allowExpensesCreate: allowCreate,
    allowExpensesRead: allowRead,
    allowExpensesUpdate: allowUpdate,
    allowExpensesDelete: allowDelete,
    allowVariablesCreate: allowCreate,
    allowVariablesRead: allowRead,
    allowVariabesUpdate: allowUpdate,
    allowVariablesDelete: allowRead,
  }
}
