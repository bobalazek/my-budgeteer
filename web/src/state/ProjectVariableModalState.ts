import { atom } from 'recoil'

import { ProjectVariableType } from 'src/types/ProjectVariableType'

export const projectVariableModalState = atom<{
  open: boolean
  selectedProjectVariable: ProjectVariableType | null
}>({
  key: 'ProjectVariableModal',
  default: {
    open: false,
    selectedProjectVariable: null,
  },
})
