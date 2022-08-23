import { Grid, TextField } from '@mui/material'

const ProjectExpenseDialogCostRangeFields = ({
  valueFrom,
  onChangeFrom,
  valueTo,
  onChangeTo,
}) => {
  return (
    <Grid container spacing={2} sx={{ width: '100%' }}>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cost (from)"
          variant="standard"
          size="small"
          value={valueFrom}
          onChange={onChangeFrom}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Cost (to)"
          variant="standard"
          size="small"
          value={valueTo}
          onChange={onChangeTo}
        />
      </Grid>
    </Grid>
  )
}

export default ProjectExpenseDialogCostRangeFields
