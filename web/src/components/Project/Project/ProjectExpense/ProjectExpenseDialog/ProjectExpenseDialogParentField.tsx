import { TextField } from '@mui/material'
import { useRecoilState } from 'recoil'

import { projectExpensesState } from 'src/state/ProjectExpensesState'

const ProjectExpenseOption = ({ projectExpense, level }) => {
  return (
    <>
      <option key={projectExpense.id} value={projectExpense.id}>
        {level ? '-'.repeat(level) + ' ' : ''}
        {projectExpense.name}
      </option>
      {projectExpense.children?.map((child) => {
        return (
          <ProjectExpenseOption
            key={child.id}
            projectExpense={child}
            level={level + 1}
          />
        )
      })}
    </>
  )
}

const ProjectExpenseDialogParentField = ({ value, onChange }) => {
  const [projectExpenses] = useRecoilState(projectExpensesState)

  return (
    <TextField
      select
      fullWidth
      label="Parent"
      size="small"
      variant="standard"
      value={value || '__NONE__'}
      onChange={onChange}
      SelectProps={{
        native: true,
      }}
    >
      {/* NOTE: Dirty hack with __NONE__, because it won't work with an empty string, whitout overflowing the label text */}
      <option value={'__NONE__'}>-- none --</option>
      {projectExpenses?.map((projectExpense) => {
        return (
          <ProjectExpenseOption
            key={projectExpense.id}
            projectExpense={projectExpense}
            level={0}
          />
        )
      })}
    </TextField>
  )
}

export default ProjectExpenseDialogParentField
