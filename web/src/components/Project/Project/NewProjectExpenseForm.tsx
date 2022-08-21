import { useState } from 'react'

import { Button, Grid, TextField, Select, MenuItem } from '@mui/material'
import { useRecoilState } from 'recoil'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { projectExpensesState } from 'src/state/ProjextExpensesState'

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
  const [parentId, setParentId] = useState(null)
  const [createProjectExpense, { loading }] = useMutation(
    CREATE_PROJECT_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project expense created')

        setName('')
        setDescription('')
        setParentId(null)
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
  const [projectExpenses, _] = useRecoilState(projectExpensesState)

  const onSubmitButtonClick = async () => {
    await createProjectExpense({
      variables: {
        input: {
          name,
          description,
          parentId,
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
        <Select
          size="small"
          value={parentId ?? ''}
          onChange={(event) => {
            setParentId(event.target.value)
          }}
          displayEmpty
        >
          <MenuItem value="">-- none --</MenuItem>
          {projectExpenses?.map((projectExpense) => {
            // TODO: show children!
            return (
              <MenuItem key={projectExpense.id} value={projectExpense.id}>
                {projectExpense.name}
              </MenuItem>
            )
          })}
        </Select>
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
