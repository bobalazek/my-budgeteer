import { useCallback, useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  DialogActions,
  Grid,
  Typography,
} from '@mui/material'
import { useRecoilState } from 'recoil'

import { toast } from '@redwoodjs/web/toast'

import {
  CREATE_PROJECT_EXPENSE_MUTATION,
  GET_PROJECT_EXPENSES_QUERY,
  UPDATE_PROJECT_EXPENSE_MUTATION,
} from 'src/graphql/ProjectExpenseQueries'
import { projectExpenseModalState } from 'src/state/ProjectExpenseModalState'
import { projectExpensesState } from 'src/state/ProjectExpensesState'

const ProjectExpenseRecurringIntervalsMap = {
  NONE: 'None',
  DAILY: 'Daily',
  WEEKLY: 'Weekly',
  MONTHLY: 'Monthly',
  QUARTER_YEARLY: 'Quarter yearly',
  HALF_YEARLY: 'Half yearly',
  YEARLY: 'Yearly',
}

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
  const [projectExpenses, _] = useRecoilState(projectExpensesState)
  const [projectExpenseModal, setProjectExpenseModal] = useRecoilState(
    projectExpenseModalState
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')
  const [costRangeFrom, setCostRangeFrom] = useState(null)
  const [costRangeTo, setCostRangeTo] = useState(null)
  const [recurringInterval, setRecurringInterval] = useState('NONE')
  const [parentId, setParentId] = useState('')
  const refetchQueries = [
    {
      query: GET_PROJECT_EXPENSES_QUERY,
      variables: { projectId: project.id },
    },
  ]
  const resetFormInputs = () => {
    setName('')
    setDescription('')
    setNote('')
    setCostRangeFrom('')
    setCostRangeTo('')
    setRecurringInterval('NONE')
    setParentId('')
  }
  const [createProjectExpense, { loading: createLoading }] = useMutation(
    CREATE_PROJECT_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project expense created')

        resetFormInputs()
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries,
    }
  )
  const [updateProjectExpense, { loading: updateLoading }] = useMutation(
    UPDATE_PROJECT_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project expense updated')

        resetFormInputs()
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries,
    }
  )

  useEffect(() => {
    setName(projectExpenseModal.selectedProjectExpense?.name || '')
    setDescription(
      projectExpenseModal.selectedProjectExpense?.description || ''
    )
    setNote(projectExpenseModal.selectedProjectExpense?.note || '')
    setCostRangeFrom(
      projectExpenseModal.selectedProjectExpense?.costRangeFrom || null
    )
    setCostRangeTo(
      projectExpenseModal.selectedProjectExpense?.costRangeTo || null
    )
    setRecurringInterval(
      projectExpenseModal.selectedProjectExpense?.recurringInterval || 'NONE'
    )
    setParentId(
      projectExpenseModal.selectedProjectExpense?.parentId ||
        projectExpenseModal.selectedProjectExpenseParent?.id ||
        ''
    )
  }, [projectExpenseModal])

  const onClose = useCallback(() => {
    setProjectExpenseModal({
      selectedProjectExpense: null,
      selectedProjectExpenseParent: null,
      open: false,
    })
  }, [setProjectExpenseModal])

  const onSubmitButtonClick = async () => {
    const options = {
      variables: {
        id: projectExpenseModal.selectedProjectExpense?.id || undefined,
        input: {
          name,
          description,
          note,
          costRangeFrom,
          costRangeTo,
          recurringInterval,
          parentId: parentId || undefined,
          projectId: project.id,
        },
      },
    }

    if (projectExpenseModal.selectedProjectExpense) {
      await updateProjectExpense(options)
    } else {
      await createProjectExpense(options)
    }

    onClose()
  }

  return (
    <Dialog open={projectExpenseModal.open} onClose={onClose}>
      <DialogTitle>
        {projectExpenseModal.selectedProjectExpense && (
          <>
            Edit &quot;{projectExpenseModal.selectedProjectExpense.name}&quot;
            project expense
          </>
        )}
        {!projectExpenseModal.selectedProjectExpense && (
          <>
            {projectExpenseModal.selectedProjectExpenseParent && (
              <>
                New project expense for &quot;
                {projectExpenseModal.selectedProjectExpenseParent.name}&quot;
              </>
            )}
            {!projectExpenseModal.selectedProjectExpenseParent && (
              <>New project expense</>
            )}
          </>
        )}
      </DialogTitle>
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
          multiline
          fullWidth
          label="Note"
          variant="standard"
          size="small"
          value={note}
          onChange={(event) => {
            setNote(event.target.value)
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
        <Typography variant="h6" sx={{ mt: 2 }}>
          Additional information
        </Typography>
        <Grid container spacing={2} sx={{ width: '100%' }}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cost (from)"
              variant="standard"
              size="small"
              value={costRangeFrom}
              onChange={(event) => {
                setCostRangeFrom(event.target.value)
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Cost (to)"
              variant="standard"
              size="small"
              value={costRangeTo}
              onChange={(event) => {
                setCostRangeTo(event.target.value)
              }}
            />
          </Grid>
        </Grid>
        <TextField
          select
          fullWidth
          label="Recurring interval"
          size="small"
          variant="standard"
          value={recurringInterval}
          onChange={(event) => {
            setRecurringInterval(event.target.value)
          }}
          SelectProps={{
            native: true,
          }}
        >
          {Object.keys(ProjectExpenseRecurringIntervalsMap).map((key) => {
            const label = ProjectExpenseRecurringIntervalsMap[key]
            return (
              <option key={key} value={key}>
                {label}
              </option>
            )
          })}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button
          variant="outlined"
          disabled={createLoading || updateLoading}
          onClick={onSubmitButtonClick}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProjectExpenseDialog
