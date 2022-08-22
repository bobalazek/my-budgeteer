import { useState } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {
  CREATE_PROJECT_VARIABLE_MUTATION,
  GET_PROJECT_VARIABLES_QUERY,
} from 'src/graphql/ProjectVariableQueries'

const NewProjectVariableForm = ({ project }) => {
  const [name, setName] = useState('')
  const [type, setType] = useState('string')
  const [value, setValue] = useState('')
  const [createProjectVariable, { loading }] = useMutation(
    CREATE_PROJECT_VARIABLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project variable created')

        setName('')
        setType('string')
        setValue('')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        {
          query: GET_PROJECT_VARIABLES_QUERY,
          variables: { projectId: project.id },
        },
      ],
    }
  )

  const onSubmitButtonClick = async () => {
    await createProjectVariable({
      variables: {
        input: {
          name,
          type,
          value,
          projectId: project.id,
        },
      },
    })
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        New variable
      </Typography>
      <Grid container spacing={1} sx={{ mb: 3 }}>
        <Grid item>
          <TextField
            label="Name"
            variant="standard"
            size="small"
            required
            value={name}
            onChange={(event) => {
              setName(event.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            required
            label="Type"
            size="small"
            variant="standard"
            value={type}
            onChange={(event) => {
              setType(event.target.value)
            }}
            SelectProps={{
              native: true,
            }}
          >
            <option value="string">String</option>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Value"
            variant="standard"
            size="small"
            required
            value={value}
            onChange={(event) => {
              setValue(event.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <Button
            variant="outlined"
            size="large"
            disabled={loading}
            onClick={onSubmitButtonClick}
          >
            Add variable
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default NewProjectVariableForm
