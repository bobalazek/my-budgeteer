export type ProjectExpenseType = {
  id: string
  name: string
  description: string
  note: string
  recurringInterval: string
  parentId: string
  children: ProjectExpenseType[]
}
