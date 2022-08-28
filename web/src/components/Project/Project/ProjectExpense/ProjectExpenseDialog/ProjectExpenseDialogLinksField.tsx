import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material'
import {
  Alert,
  Box,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  TextField,
} from '@mui/material'

const ProjectExpenseDialogLinksField = ({ value, onChange }) => {
  return (
    <FormGroup sx={{ px: 2 }}>
      <Grid container>
        <Grid item>
          <FormLabel sx={{ verticalAlign: 'sub', mr: 1 }}>Links</FormLabel>
        </Grid>
        <Grid item>
          <IconButton
            size="small"
            onClick={() => {
              onChange([...value, ''])
            }}
          >
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
      {!value ||
        (value.length === 0 && <Alert severity="info">No links yet</Alert>)}
      {value && (
        <Box>
          {value.map((link, index) => {
            return (
              <Grid container key={index}>
                <Grid item sx={{ flexGrow: 1 }}>
                  <TextField
                    required
                    multiline
                    fullWidth
                    label={null}
                    placeholder="Enter a link here"
                    variant="standard"
                    size="small"
                    value={link}
                    onChange={(event) => {
                      onChange(
                        value.map((item, itemIndex) => {
                          return itemIndex === index ? event.target.value : item
                        })
                      )
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    size="small"
                    sx={{ verticalAlign: 'text-top' }}
                    onClick={() => {
                      onChange(
                        value.filter((_, itemIndex) => {
                          return itemIndex !== index
                        })
                      )
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Grid>
              </Grid>
            )
          })}
        </Box>
      )}
    </FormGroup>
  )
}

export default ProjectExpenseDialogLinksField
