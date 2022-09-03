import { TextField } from '@mui/material'

const ProjectFormDescriptionField = ({ value, onChange }) => {
  return (
    <TextField
      required
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

export default ProjectFormDescriptionField
