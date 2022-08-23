import { TextField } from '@mui/material'

const ProjectExpenseDialogNameField = ({ value, onChange }) => {
  return (
    <TextField
      required
      multiline
      fullWidth
      label="Name"
      variant="standard"
      size="small"
      value={value}
      onChange={onChange}
    />
  )
}

export default ProjectExpenseDialogNameField
