export type ProjectType = {
  id: string
  name: string
  description: string
  currencySymbol: string
  isPublic: boolean
  isTemplate: boolean
  costEstimated: number
  category: null | {
    name: string
  }
  createdAt: string
  updatedAt: string
  permissions?: {
    allowRead: boolean
    allowUpdate: boolean
    allowDelete: boolean
    allowClone: boolean
    allowExpensesCreate: boolean
    allowExpensesRead: boolean
    allowExpensesUpdate: boolean
    allowExpensesDelete: boolean
    allowVariablesCreate: boolean
    allowVariablesRead: boolean
    allowVariablesUpdate: boolean
    allowVariablesDelete: boolean
  }
}
