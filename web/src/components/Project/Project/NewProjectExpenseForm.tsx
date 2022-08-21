import { useState } from 'react'

import { Button, Grid, TextField } from '@mui/material'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { GET_PROJECT_EXPENSES_QUERY } from './ProjectExpenses'

const CREATE_PROJECT_EXPENSE_MUTATION = gql`
  mutation CreateProjectExpenseMutation($input: CreateProjectExpenseInput!) {
    createProjectExpense(input: $input) {
      id
    }
  }
`

const NewProjectExpenseForm = ({ project }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [createProjectExpense, { loading }] = useMutation(
    CREATE_PROJECT_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project expense created')

        setName('')
        setDescription('')
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries: [
        {
          query: GET_PROJECT_EXPENSES_QUERY,
          variables: { projectId: project.id },
        },
      ],
    }
  )

  const onSubmitButtonClick = async () => {
    await createProjectExpense({
      variables: {
        input: {
          name,
          description,
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
          required
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
      </Grid>
      <Grid item>
        <TextField
          label="Description"
          variant="outlined"
          size="small"
          multiline
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
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
          Add expense
        </Button>
      </Grid>
    </Grid>
  )
}

export default NewProjectExpenseForm
