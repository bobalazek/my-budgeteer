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
import ProjectExpenseDialogLinksField from './ProjectExpenseDialog/ProjectExpenseDialogLinksField'
import ProjectExpenseDialogNameField from './ProjectExpenseDialog/ProjectExpenseDialogNameField'
import ProjectExpenseDialogNoteField from './ProjectExpenseDialog/ProjectExpenseDialogNoteField'
import ProjectExpenseDialogParentField from './ProjectExpenseDialog/ProjectExpenseDialogParentField'
import ProjectExpenseDialogProgressPercentageField from './ProjectExpenseDialog/ProjectExpenseDialogProgressPercentageField'
import ProjectExpenseDialogRecurringIntervalField from './ProjectExpenseDialog/ProjectExpenseDialogRecurringIntervalField'
import ProjectExpenseDialogTagsField from './ProjectExpenseDialog/ProjectExpenseDialogTagsField'

const ProjectExpenseDialog = ({ project }) => {
  const [projectExpenseModal, setProjectExpenseModal] = useRecoilState(
    projectExpenseModalState
  )
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [note, setNote] = useState('')
  const [recurringInterval, setRecurringInterval] = useState('NONE')
  const [costActual, setCostActual] = useState('')
  const [costRangeFrom, setCostRangeFrom] = useState('')
  const [costRangeTo, setCostRangeTo] = useState('')
  const [progressPercentage, setProgressPercentage] = useState(0)
  const [tags, setTags] = useState([])
  const [links, setLinks] = useState([])
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
    setRecurringInterval('NONE')
    setCostActual('')
    setCostRangeFrom('')
    setCostRangeTo('')
    setProgressPercentage(0)
    setTags([])
    setLinks([])
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
    setRecurringInterval(
      projectExpenseModal.selectedProjectExpense?.recurringInterval || 'NONE'
    )
    setCostActual(
      projectExpenseModal.selectedProjectExpense?.costActual?.toString() || ''
    )
    setCostRangeFrom(
      projectExpenseModal.selectedProjectExpense?.costRangeFrom?.toString() ||
        ''
    )
    setCostRangeTo(
      projectExpenseModal.selectedProjectExpense?.costRangeTo?.toString() || ''
    )
    setProgressPercentage(
      projectExpenseModal.selectedProjectExpense?.progressPercentage || 0
    )
    setTags(projectExpenseModal.selectedProjectExpense?.tags || [])
    setLinks(projectExpenseModal.selectedProjectExpense?.links || [])
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
          recurringInterval,
          costRangeFrom: costRangeFrom ? parseFloat(costRangeFrom) : null,
          costRangeTo: costRangeTo ? parseFloat(costRangeTo) : null,
          costActual: costActual ? parseFloat(costActual) : null,
          progressPercentage,
          tags,
          links,
          parentId: parentId || null,
          projectId: project.id,
        },
      },
    }

    let errors
    if (projectExpenseModal.selectedProjectExpense) {
      const updateResponse = await updateProjectExpense(options)
      errors = updateResponse.errors
    } else {
      const createResponse = await createProjectExpense(options)
      errors = createResponse.errors
    }

    if (!errors) {
      onClose()
    }
  }

  return (
    <Dialog open={projectExpenseModal.open} onClose={onClose}>
      <DialogTitle sx={{ mb: 0 }}>
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
          '& .MuiTextField-root': { my: 1 },
        }}
      >
        <ProjectExpenseDialogNameField
          value={name}
          onChange={(value) => {
            setName(value)
          }}
        />
        <ProjectExpenseDialogDescriptionField
          value={description}
          onChange={(value) => {
            setDescription(value)
          }}
        />
        <ProjectExpenseDialogNoteField
          value={note}
          onChange={(value) => {
            setNote(value)
          }}
        />
        <ProjectExpenseDialogParentField
          value={parentId}
          onChange={(value) => {
            setParentId(value)
          }}
        />
        <Typography variant="h6" sx={{ mt: 2, fontSize: 18 }}>
          Additional information
        </Typography>
        <ProjectExpenseDialogRecurringIntervalField
          value={recurringInterval}
          onChange={(value) => {
            setRecurringInterval(value)
          }}
        />
        <ProjectExpenseDialogCostRangeFields
          project={project}
          valueFrom={costRangeFrom}
          onChangeFrom={(value) => {
            setCostRangeFrom(value)
          }}
          valueTo={costRangeTo}
          onChangeTo={(value) => {
            setCostRangeTo(value)
          }}
        />
        <ProjectExpenseDialogCostActualField
          project={project}
          value={costActual}
          onChange={(value) => {
            setCostActual(value)
          }}
        />
        <ProjectExpenseDialogProgressPercentageField
          value={progressPercentage}
          onChange={(value) => {
            setProgressPercentage(value)
          }}
        />
        <ProjectExpenseDialogTagsField
          value={tags}
          onChange={(value) => {
            setTags(value)
          }}
        />
        <ProjectExpenseDialogLinksField
          value={links}
          onChange={(value) => {
            setLinks(value)
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
