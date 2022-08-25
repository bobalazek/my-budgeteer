import { Grid, InputAdornment, TextField, Typography } from '@mui/material'

const ProjectExpenseDialogCostRangeFields = ({
  project,
  valueFrom,
  onChangeFrom,
  valueTo,
  onChangeTo,
}) => {
  return (
    <>
      <Typography variant="h5" sx={{ fontSize: 16, px: 1, pt: 1 }}>
        Cost
      </Typography>
      <Grid container spacing={2} sx={{ width: '100%' }}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="From"
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
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="To"
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
        </Grid>
      </Grid>
    </>
  )
}

export default ProjectExpenseDialogCostRangeFields
