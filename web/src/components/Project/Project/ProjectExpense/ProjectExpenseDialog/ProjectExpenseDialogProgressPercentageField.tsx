import { Box, Slider, Typography } from '@mui/material'

const ProjectExpenseDialogProgressPercentageField = ({ value, onChange }) => {
  return (
    <Box sx={{ m: 1, color: 'text.secondary' }}>
      <Typography gutterBottom>Progress: {value}%</Typography>
      <Box sx={{ mx: 2 }}>
        <Slider
          value={value}
          onChange={onChange}
          min={0}
          max={100}
          marks={[
            { value: 0, label: '0%' },
            { value: 100, label: '100%' },
          ]}
        />
      </Box>
    </Box>
  )
}

export default ProjectExpenseDialogProgressPercentageField
