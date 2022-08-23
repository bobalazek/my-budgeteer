export type ProjectExpenseType = {
  id: string
  name: string
  description: string
  note: string
  recurringInterval: string
  costRangeFrom: number
  costRangeTo: number
  costActual: number
  progressPercentage: number
  meta: Record<string, string>
  conditions: Record<string, any>
  links: string[]
  tags: string[]
  parentId: string
  children: ProjectExpenseType[]
}
