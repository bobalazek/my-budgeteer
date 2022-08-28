import { Autocomplete, TextField } from '@mui/material'

const ProjectExpenseDialogTagsField = ({ value, onChange }) => {
  return (
    <Autocomplete
      multiple
      freeSolo
      options={[]}
      value={value}
      onChange={(_: any, newValue: any) => {
        onChange(newValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Tags"
          helperText="You need to press enter, to save the entry"
        />
      )}
    />
  )
}

export default ProjectExpenseDialogTagsField
