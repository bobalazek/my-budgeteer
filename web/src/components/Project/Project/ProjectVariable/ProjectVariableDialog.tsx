import { useCallback, useEffect, useState } from 'react'

import { useMutation } from '@apollo/client'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  DialogActions,
} from '@mui/material'
import { useRecoilState } from 'recoil'

import { toast } from '@redwoodjs/web/toast'

import {
  CREATE_PROJECT_VARIABLE_MUTATION,
  GET_PROJECT_VARIABLES_QUERY,
  UPDATE_PROJECT_VARIABLE_MUTATION,
} from 'src/graphql/ProjectVariableQueries'
import { projectVariableModalState } from 'src/state/ProjectVariableModalState'

import ProjectVariableDialogNameField from './ProjectVariableDialog/ProjectVariableDialogNameField'
import ProjectVariableDialogTypeField from './ProjectVariableDialog/ProjectVariableDialogTypeField'
import ProjectVariableDialogValueField from './ProjectVariableDialog/ProjectVariableDialogValueField'

const ProjectVariableDialog = ({ project }) => {
  const [projectVariableModal, setProjectVariableModal] = useRecoilState(
    projectVariableModalState
  )
  const [name, setName] = useState('')
  const [type, setType] = useState('string')
  const [value, setValue] = useState('')
  const refetchQueries = [
    {
      query: GET_PROJECT_VARIABLES_QUERY,
      variables: { projectId: project.id },
    },
  ]
  const resetFormInputs = () => {
    setName('')
    setType('string')
    setValue('')
  }
  const [createProjectVariable, { loading: createLoading }] = useMutation(
    CREATE_PROJECT_VARIABLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project variable created')

        resetFormInputs()
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries,
    }
  )
  const [updateProjectVariable, { loading: updateLoading }] = useMutation(
    UPDATE_PROJECT_VARIABLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project variable updated')

        resetFormInputs()
      },
      onError: (error) => {
        toast.error(error.message)
      },
      refetchQueries,
    }
  )

  useEffect(() => {
    setName(projectVariableModal.selectedProjectVariable?.name || '')
    setType(projectVariableModal.selectedProjectVariable?.type || 'string')
    setValue(projectVariableModal.selectedProjectVariable?.value || '')
  }, [projectVariableModal])

  const onClose = useCallback(() => {
    setProjectVariableModal({
      selectedProjectVariable: null,
      open: false,
    })
  }, [setProjectVariableModal])

  const onSubmitButtonClick = async () => {
    const options = {
      variables: {
        id: projectVariableModal.selectedProjectVariable?.id || undefined,
        input: {
          name,
          type,
          value,
          projectId: project.id,
        },
      },
    }

    let errors
    if (projectVariableModal.selectedProjectVariable) {
      const updateResponse = await updateProjectVariable(options)
      errors = updateResponse.errors
    } else {
      const createResponse = await createProjectVariable(options)
      errors = createResponse.errors
    }

    if (!errors) {
      onClose()
    }
  }

  return (
    <Dialog open={projectVariableModal.open} onClose={onClose}>
      <DialogTitle sx={{ mb: 0 }}>
        {projectVariableModal.selectedProjectVariable && (
          <>
            Edit &quot;{projectVariableModal.selectedProjectVariable.name}&quot;
            project variable
          </>
        )}
        {!projectVariableModal.selectedProjectVariable && (
          <>New project variable</>
        )}
      </DialogTitle>
      <DialogContent
        sx={{
          '& .MuiTextField-root': { my: 1 },
        }}
      >
        <ProjectVariableDialogNameField
          value={name}
          onChange={(value) => {
            setName(value)
          }}
        />
        <ProjectVariableDialogTypeField
          value={name}
          onChange={(value) => {
            setType(value)
          }}
        />
        <ProjectVariableDialogValueField
          value={value}
          onChange={(value) => {
            setValue(value)
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

export default ProjectVariableDialog
