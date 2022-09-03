import { useEffect } from 'react'

import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useSetRecoilState } from 'recoil'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {
  DELETE_PROJECT_VARIABLE_MUTATION,
  GET_PROJECT_VARIABLES_QUERY,
} from 'src/graphql/ProjectVariableQueries'
import { projectVariableModalState } from 'src/state/ProjectVariableModalState'
import { projectVariablesState } from 'src/state/ProjectVariablesState'
import { ProjectType } from 'src/types/ProjectType'
import { ProjectVariableType } from 'src/types/ProjectVariableType'

const ProjectVariables = ({ project }: { project: ProjectType }) => {
  const setProjectVariableModal = useSetRecoilState(projectVariableModalState)
  const { data, loading, error } = useQuery(GET_PROJECT_VARIABLES_QUERY, {
    variables: {
      projectId: project.id,
    },
  })
  const [deleteProjectVariable] = useMutation(
    DELETE_PROJECT_VARIABLE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Project variable deleted')
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
  const confirm = useConfirm()
  const setProjectVariables = useSetRecoilState(projectVariablesState)

  useEffect(() => {
    setProjectVariables(data?.projectVariables || [])
  }, [setProjectVariables, data])

  const onEditButtonClick = async (projectVariable: ProjectVariableType) => {
    setProjectVariableModal({
      open: true,
      selectedProjectVariable: projectVariable,
    })
  }

  const onDeleteButtonClick = async (projectVariable: ProjectVariableType) => {
    try {
      await confirm({
        description:
          'Are you sure you want to delete this variable? This action is irreversible!',
      })

      deleteProjectVariable({
        variables: {
          id: projectVariable.id,
        },
      })
    } catch (err) {
      // Nothing to do
    }
  }

  if (loading) {
    return <>Loading ...</>
  }

  if (error) {
    return <>Error: {error}</>
  }

  if (data.projectVariables.length === 0) {
    return <Box sx={{ mb: 2 }}>No project variables yet</Box>
  }

  return (
    <Box sx={{ mb: 2 }}>
      {data.projectVariables.map((projectVariable) => {
        return (
          <Box key={projectVariable.id} sx={{ mb: '4px' }}>
            <b>
              {projectVariable.name} ({projectVariable.type}):&nbsp;
            </b>
            <span>{projectVariable.value}</span>
            {project.permissions.allowVariablesUpdate && (
              <IconButton
                size="small"
                sx={{ ml: 1 }}
                onClick={() => onEditButtonClick(projectVariable)}
              >
                <EditIcon />
              </IconButton>
            )}
            {project.permissions.allowVariablesDelete && (
              <IconButton
                size="small"
                sx={{ ml: 1 }}
                onClick={() => onDeleteButtonClick(projectVariable)}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        )
      })}
    </Box>
  )
}

export default ProjectVariables
