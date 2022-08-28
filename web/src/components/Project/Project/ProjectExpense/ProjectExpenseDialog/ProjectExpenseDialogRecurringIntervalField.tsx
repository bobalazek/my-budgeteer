import { TextField } from '@mui/material'

export const ProjectExpenseRecurringIntervalsMap = {
  NONE: 'None',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  QUARTER_YEARLY: 'Quarter yearly',
  HALF_YEARLY: 'Half yearly',
  YEARLY: 'Yearly',
}

const ProjectExpenseDialogRecurringIntervalField = ({ value, onChange }) => {
  return (
    <TextField
      select
      fullWidth
      label="Recurring interval"
      size="small"
      variant="standard"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      SelectProps={{
        native: true,
      }}
    >
      {Object.keys(ProjectExpenseRecurringIntervalsMap).map((key) => {
        const label = ProjectExpenseRecurringIntervalsMap[key]
        return (
          <option key={key} value={key}>
            {label}
          </option>
        )
      })}
    </TextField>
  )
}

export default ProjectExpenseDialogRecurringIntervalField
