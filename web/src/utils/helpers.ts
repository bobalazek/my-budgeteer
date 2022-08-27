import { ProjectExpenseType } from 'src/types/ProjectExpenseType'

export const isNumeric = (n: any): boolean => {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

export const generateProjectExpensesTree = (
  projectExpenses: ProjectExpenseType[]
): ProjectExpenseType[] => {
  const array = JSON.parse(
    JSON.stringify(projectExpenses)
  ) as typeof projectExpenses
  const tree: ProjectExpenseType[] = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i]

    if (item.parentId) {
      const parent = array.filter((elem) => elem.id === item.parentId).pop()
      if (!parent) {
        continue
      }

      if (!parent.children) {
        parent.children = []
      }

      parent.children.push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}
