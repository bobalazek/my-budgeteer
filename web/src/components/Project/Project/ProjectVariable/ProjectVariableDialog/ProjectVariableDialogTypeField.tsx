import { TextField } from '@mui/material'

const ProjectVariableDialogTypeField = ({ value, onChange }) => {
  return (
    <TextField
      select
      fullWidth
      label="Type"
      size="small"
      variant="standard"
      value={value}
      onChange={onChange}
      SelectProps={{
        native: true,
      }}
    >
      <option value="string">String</option>
    </TextField>
  )
}

export default ProjectVariableDialogTypeField
