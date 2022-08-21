import { useState } from 'react'

import { Button, Grid, MenuItem, Select, TextField } from '@mui/material'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { GET_PROJECT_VARIABLES_QUERY } from './ProjectVariables'

const CREATE_PROJECT_VARIABLE_MUTATION = gql`
  mutation CreateProjectVariableMutation($input: CreateProjectVariableInput!) {
    createProjectVariable(input: $input) {
      id
    }
  }
`

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
    <Grid container spacing={1} sx={{ mb: 3 }}>
      <Grid item>
        <TextField
          label="Name"
          variant="outlined"
          size="small"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <Select
          size="small"
          value={type}
          onChange={(event) => {
            setName(event.target.value)
          }}
        >
          <MenuItem value="string">String</MenuItem>
        </Select>
      </Grid>
      <Grid item>
        <TextField
          label="Value"
          variant="outlined"
          size="small"
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
  )
}

export default NewProjectVariableForm
