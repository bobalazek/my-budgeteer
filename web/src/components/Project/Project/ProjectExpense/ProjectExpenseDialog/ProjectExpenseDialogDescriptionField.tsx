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
      onChange={onChange}
    />
  )
}

export default ProjectExpenseDialogDescriptionField
