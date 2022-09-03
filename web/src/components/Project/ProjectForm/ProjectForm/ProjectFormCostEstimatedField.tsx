import { InputAdornment, TextField } from '@mui/material'

const ProjectFormCostEstimatedField = ({ value, onChange, currencySymbol }) => {
  return (
    <TextField
      fullWidth
      label="Estimated cost"
      variant="standard"
      size="small"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      InputProps={
        currencySymbol
          ? {
              endAdornment: (
                <InputAdornment position="end">{currencySymbol}</InputAdornment>
              ),
            }
          : undefined
      }
      helperText="How much would you estimate the project to cost at the end?"
    />
  )
}

export default ProjectFormCostEstimatedField
