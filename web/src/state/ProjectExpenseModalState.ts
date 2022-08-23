import { atom } from 'recoil'

import { ProjectExpenseType } from 'src/types/ProjectExpenseType'

export const projectExpenseModalState = atom<{
  open: boolean
  selectedProjectExpenseParentId: string | null
  selectedProjectExpense: ProjectExpenseType | null
}>({
  key: 'ProjectExpenseModal',
  default: {
    open: false,
    selectedProjectExpenseParentId: null,
    selectedProjectExpense: null,
  },
})
