import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const GET_PROJECT_VARIABLES_QUERY = gql`
  query GetProjectVariables($projectId: String!) {
    projectVariables(projectId: $projectId) {
      id
      name
      value
      type
      createdAt
      updatedAt
    }
  }
`

const DELETE_PROJECT_VARIABLE_MUTATION = gql`
  mutation DeleteProjectVariableMutation($id: String!) {
    deleteProjectVariable(id: $id) {
      id
    }
  }
`

const ProjectVariables = ({ project }) => {
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

  const onDeleteButtonClick = async (id: string) => {
    try {
      await confirm({
        description:
          'Are you sure you want to delete this variable? This action is irreversible!',
      })

      deleteProjectVariable({
        variables: {
          id,
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
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={() => onDeleteButtonClick(projectVariable.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      })}
    </Box>
  )
}

export default ProjectVariables
