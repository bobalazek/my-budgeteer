import { InputAdornment, TextField } from '@mui/material'

const ProjectExpenseDialogCostActualField = ({ project, value, onChange }) => {
  return (
    <TextField
      fullWidth
      label="Actual cost"
      variant="standard"
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            {project.currencySymbol}
          </InputAdornment>
        ),
      }}
      helperText="How much did it actually cost at the end?"
    />
  )
}

export default ProjectExpenseDialogCostActualField
