import { useState } from 'react'

import { Button, Grid, TextField, Typography } from '@mui/material'
import { useRecoilState } from 'recoil'

import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {
  CREATE_PROJECT_EXPENSE_MUTATION,
  GET_PROJECT_EXPENSES_QUERY,
} from 'src/graphql/ProjectExpenseQueries'
import { projectExpensesState } from 'src/state/ProjextExpensesState'

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
    <>
      <Typography variant="h5" sx={{ mb: 1 }}>
        New expense
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
            label="Description"
            variant="standard"
            size="small"
            multiline
            value={description}
            onChange={(event) => {
              setDescription(event.target.value)
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="Parent"
            size="small"
            variant="standard"
            value={parentId || '__NONE__'}
            onChange={(event) => {
              setParentId(event.target.value)
            }}
            SelectProps={{
              native: true,
            }}
          >
            {/* NOTE: Dirty hack with __NONE__, because it won't work with an empty string, whitout overflowing the label text */}
            <option value={'__NONE__'}>-- none --</option>
            {projectExpenses?.map((projectExpense) => {
              return (
                <ProjectExpenseOption
                  key={projectExpense.id}
                  projectExpense={projectExpense}
                  level={0}
                />
              )
            })}
          </TextField>
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
    </>
  )
}

export default NewProjectExpenseForm
