import { useCallback, useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
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

import ProjectExpenseDialogCostActualField from './ProjectExpenseDialog/ProjectExpenseDialogCostActualField'
import ProjectExpenseDialogCostRangeFields from './ProjectExpenseDialog/ProjectExpenseDialogCostRangeFields'
import ProjectExpenseDialogDescriptionField from './ProjectExpenseDialog/ProjectExpenseDialogDescriptionField'
import ProjectExpenseDialogNameField from './ProjectExpenseDialog/ProjectExpenseDialogNameField'
import ProjectExpenseDialogNoteField from './ProjectExpenseDialog/ProjectExpenseDialogNoteField'
import ProjectExpenseDialogParentField from './ProjectExpenseDialog/ProjectExpenseDialogParentField'
import ProjectExpenseDialogProgressPercentageField from './ProjectExpenseDialog/ProjectExpenseDialogProgressPercentageField'
import ProjectExpenseDialogRecurringIntervalField from './ProjectExpenseDialog/ProjectExpenseDialogRecurringIntervalField'

const ProjectExpenseDialog = ({ project }) => {
  const [projectExpenseModal, setProjectExpenseModal] = useRecoilState(
    projectExpenseModalState
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')
  const [costRangeFrom, setCostRangeFrom] = useState('')
  const [costRangeTo, setCostRangeTo] = useState('')
  const [recurringInterval, setRecurringInterval] = useState('NONE')
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [costActual, setCostActual] = useState('')
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
    setProgressPercentage(0)
    setCostActual('')
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
      projectExpenseModal.selectedProjectExpense?.costRangeFrom?.toString() ||
        ''
    )
    setCostRangeTo(
      projectExpenseModal.selectedProjectExpense?.costRangeTo?.toString() || ''
    )
    setRecurringInterval(
      projectExpenseModal.selectedProjectExpense?.recurringInterval || 'NONE'
    )
    setProgressPercentage(
      projectExpenseModal.selectedProjectExpense?.progressPercentage || 0
    )
    setCostActual(
      projectExpenseModal.selectedProjectExpense?.costActual?.toString() || ''
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
          progressPercentage,
          costActual,
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
        <ProjectExpenseDialogNameField
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
        />
        <ProjectExpenseDialogDescriptionField
          value={description}
          onChange={(event) => {
            setDescription(event.target.value)
          }}
        />
        <ProjectExpenseDialogNoteField
          value={note}
          onChange={(event) => {
            setNote(event.target.value)
          }}
        />
        <ProjectExpenseDialogParentField
          value={parentId}
          onChange={(event) => {
            setParentId(event.target.value)
          }}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Additional information
        </Typography>
        <ProjectExpenseDialogCostRangeFields
          project={project}
          valueFrom={costRangeFrom}
          onChangeFrom={(event) => {
            setCostRangeFrom(event.target.value)
          }}
          valueTo={costRangeTo}
          onChangeTo={(event) => {
            setCostRangeTo(event.target.value)
          }}
        />
        <ProjectExpenseDialogRecurringIntervalField
          value={recurringInterval}
          onChange={(event) => {
            setRecurringInterval(event.target.value)
          }}
        />
        <ProjectExpenseDialogProgressPercentageField
          value={progressPercentage}
          onChange={(event) => {
            setProgressPercentage(event.target.value)
          }}
        />
        <ProjectExpenseDialogCostActualField
          project={project}
          value={costActual}
          onChange={(event) => {
            setCostActual(event.target.value)
          }}
        />
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
