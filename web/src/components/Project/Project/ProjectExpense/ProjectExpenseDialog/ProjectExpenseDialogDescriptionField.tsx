import { TextField } from '@mui/material'

const ProjectExpenseDialogDescriptionField = ({ value, onChange }) => {
  return (
    <TextField
      multiline
      fullWidth
      label="Description"
      variant="standard"
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default ProjectExpenseDialogDescriptionField
