import { atom } from 'recoil'

import { ProjectExpenseType } from 'src/types/ProjectExpenseType'

export const newProjectExpenseModalState = atom<{
  open: boolean
  selectedProjectExpense: ProjectExpenseType | null
}>({
  key: 'NewProjectExpenseModal',
  default: {
    open: false,
    selectedProjectExpense: null,
  },
})
