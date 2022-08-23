import { atom } from 'recoil'

import { ProjectExpenseType } from 'src/types/ProjectExpenseType'

export const projectExpenseModalState = atom<{
  open: boolean
  selectedProjectExpenseParent: ProjectExpenseType | null
  selectedProjectExpense: ProjectExpenseType | null
}>({
  key: 'ProjectExpenseModal',
  default: {
    open: false,
    selectedProjectExpenseParent: null,
    selectedProjectExpense: null,
  },
})
