import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

export const GET_PROJECT_EXPENSES_QUERY = gql`
  query GetProjectExpenses($projectId: String!) {
    projectExpenses(projectId: $projectId) {
      id
      name
      description
      note
      recurringInterval
      costRangeFrom
      costRangeTo
      costActual
      progressPercentage
      meta
      conditions
      links
      tags
      isArchived
      parentId
      createdAt
      updatedAt
    }
  }
`

const DELETE_PROJECT_EXPENSE_MUTATION = gql`
  mutation DeleteProjectExpenseMutation($id: String!) {
    deleteProjectExpense(id: $id) {
      id
    }
  }
`

const ProjectExpenses = ({ project }) => {
  const { data, loading, error } = useQuery(GET_PROJECT_EXPENSES_QUERY, {
    variables: {
      projectId: project.id,
    },
  })
  const [deleteProjectExpense] = useMutation(DELETE_PROJECT_EXPENSE_MUTATION, {
    onCompleted: () => {
      toast.success('Project expense deleted')
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
  })

  const onDeleteButtonClick = (id: string) => {
    deleteProjectExpense({
      variables: {
        id,
      },
    })
  }

  if (loading) {
    return <>Loading ...</>
  }

  if (error) {
    return <>Error: {error}</>
  }

  if (data.projectExpenses.length === 0) {
    return <Box sx={{ mb: 2 }}>No project expenses yet</Box>
  }

  return (
    <Box sx={{ mb: 2 }}>
      {data.projectExpenses.map((projectExpense) => {
        return (
          <Box key={projectExpense.id} sx={{ mb: '4px' }}>
            <b>{projectExpense.name}</b>
            <IconButton
              size="small"
              sx={{ ml: 1 }}
              onClick={() => onDeleteButtonClick(projectExpense.id)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        )
      })}
    </Box>
  )
}

export default ProjectExpenses
