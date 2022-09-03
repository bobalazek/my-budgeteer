import { FormControlLabel, Switch } from '@mui/material'

const ProjectFormIsTemplateField = ({ value, onChange }) => {
  return (
    <FormControlLabel
      label="Is Template"
      checked={value}
      onChange={(_, checked) => onChange(checked)}
      control={<Switch size="small" />}
    />
  )
}

export default ProjectFormIsTemplateField
