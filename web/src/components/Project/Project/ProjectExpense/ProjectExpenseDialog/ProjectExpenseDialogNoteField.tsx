import { TextField } from '@mui/material'

const ProjectExpenseDialogNoteField = ({ value, onChange }) => {
  return (
    <TextField
      multiline
      fullWidth
      label="Note"
      variant="standard"
      size="small"
      value={value}
      onChange={onChange}
    />
  )
}

export default ProjectExpenseDialogNoteField
