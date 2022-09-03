import { FormControlLabel, Switch } from '@mui/material'

const ProjectFormIsPublicField = ({ value, onChange }) => {
  return (
    <FormControlLabel
      label="Is Public"
      checked={value}
      onChange={(_, checked) => onChange(checked)}
      control={<Switch size="small" />}
    />
  )
}

export default ProjectFormIsPublicField
