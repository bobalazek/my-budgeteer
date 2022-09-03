import { atom } from 'recoil'

import { ProjectExpenseType } from 'src/types/ProjectExpenseType'

export const projectVariablesState = atom<ProjectExpenseType[]>({
  key: 'ProjectVariables',
  default: [],
})
