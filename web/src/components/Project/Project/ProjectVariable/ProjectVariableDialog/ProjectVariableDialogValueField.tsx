import { TextField } from '@mui/material'

const ProjectVariableDialogValueField = ({ value, onChange }) => {
  return (
    <TextField
      required
      multiline
      fullWidth
      label="Value"
      variant="standard"
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default ProjectVariableDialogValueField
