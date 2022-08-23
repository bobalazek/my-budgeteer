import { useCallback, useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  DialogActions,
} from '@mui/material'
import { useRecoilState } from 'recoil'

import { toast } from '@redwoodjs/web/toast'

import {
  CREATE_PROJECT_EXPENSE_MUTATION,
  GET_PROJECT_EXPENSES_QUERY,
} from 'src/graphql/ProjectExpenseQueries'
import { projectExpenseModalState } from 'src/state/ProjectExpenseModalState'
import { projectExpensesState } from 'src/state/ProjectExpensesState'

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

const ProjectExpenseDialog = ({ project }) => {
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
  const [projectExpenseModal, setProjectExpenseModal] = useRecoilState(
    projectExpenseModalState
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [parentId, setParentId] = useState('')

  useEffect(() => {
    setName(projectExpenseModal.selectedProjectExpense?.name || '')
    setDescription(
      projectExpenseModal.selectedProjectExpense?.description || ''
    )
    setParentId(
      projectExpenseModal.selectedProjectExpense?.parentId ||
        projectExpenseModal.selectedProjectExpenseParentId ||
        ''
    )
  }, [projectExpenseModal])

  const onClose = useCallback(() => {
    setProjectExpenseModal({
      selectedProjectExpense: null,
      selectedProjectExpenseParentId: null,
      open: false,
    })
  }, [setProjectExpenseModal])

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

    onClose()
  }

  return (
    <Dialog open={projectExpenseModal.open} onClose={onClose}>
      <DialogTitle>New project expense</DialogTitle>
      <DialogContent
        sx={{
          '& .MuiTextField-root': { m: 1 },
        }}
      >
        <TextField
          required
          multiline
          fullWidth
          label="Name"
          variant="standard"
          size="small"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <TextField
          multiline
          fullWidth
          label="Description"
          variant="standard"
          size="small"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />
        <TextField
          select
          fullWidth
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="outlined"
          disabled={loading}
          onClick={onSubmitButtonClick}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectExpenseDialog
