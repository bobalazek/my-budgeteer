import { Box, InputAdornment, TextField, Typography } from '@mui/material'

const ProjectExpenseDialogCostRangeFields = ({
  project,
  valueFrom,
  onChangeFrom,
  valueTo,
  onChangeTo,
}) => {
  return (
    <>
      <Typography
        variant="h5"
        sx={{ fontSize: 16, pt: 2, color: 'text.secondary' }}
      >
        Cost
      </Typography>
      <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
        <Box gridColumn="span 6">
          <TextField
            fullWidth
            label="From range"
            variant="standard"
            size="small"
            value={valueFrom}
            onChange={(event) => onChangeFrom(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {project.currencySymbol}
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box gridColumn="span 6">
          <TextField
            fullWidth
            label="To range"
            variant="standard"
            size="small"
            value={valueTo}
            onChange={(event) => onChangeTo(event.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {project.currencySymbol}
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default ProjectExpenseDialogCostRangeFields
