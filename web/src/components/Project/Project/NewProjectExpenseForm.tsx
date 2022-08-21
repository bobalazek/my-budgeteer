import { useState } from 'react'

import { Button, Grid, TextField, NativeSelect } from '@mui/material'
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

const ProjectExpenseOption = ({ projectExpense, level }) => {
  return (
    <>
      <option key={projectExpense.id} value={projectExpense.id}>
        {level ? '-'.repeat(level) + ' ' : ''}
        {projectExpense.name}
      </option>
      {projectExpense.children?.map((child) => {
        return (
          <ProjectExpenseOption
            key={child.id}
            projectExpense={child}
            level={level + 1}
          />
        )
      })}
    </>
  )
}

const NewProjectExpenseForm = ({ project }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parentId, setParentId] = useState('')
  const [createProjectExpense, { loading }] = useMutation(
    CREATE_PROJECT_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project expense created')

        setName('')
        setDescription('')
        setParentId('')
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
        <NativeSelect
          size="small"
          variant="outlined"
          value={parentId}
          onChange={(event) => {
            setParentId(event.target.value)
          }}
        >
          <option value="">-- none --</option>
          {projectExpenses?.map((projectExpense) => {
            return (
              <ProjectExpenseOption
                key={projectExpense.id}
                projectExpense={projectExpense}
                level={0}
              />
            )
          })}
        </NativeSelect>
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
