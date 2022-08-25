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
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default ProjectExpenseDialogNameField
