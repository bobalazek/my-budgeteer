import { TextField } from '@mui/material'

const ProjectFormNameField = ({ value, onChange }) => {
  return (
    <TextField
      required
      fullWidth
      label="Name"
      variant="standard"
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default ProjectFormNameField
