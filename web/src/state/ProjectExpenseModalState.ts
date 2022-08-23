import { atom } from 'recoil'

import { ProjectExpenseType } from 'src/types/ProjectExpenseType'

export const projectExpenseModalState = atom<{
  open: boolean
  selectedProjectExpense: ProjectExpenseType | null
}>({
  key: 'ProjectExpenseModal',
  default: {
    open: false,
    selectedProjectExpense: null,
  },
})
