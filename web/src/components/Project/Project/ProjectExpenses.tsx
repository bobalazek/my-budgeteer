import { useEffect, useMemo } from 'react'

import { Delete as DeleteIcon } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useSetRecoilState } from 'recoil'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import { projectExpensesState } from 'src/state/ProjextExpensesState'

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

type ProjectExpenseType = {
  id: string
  name: string
  description: string
  note: string
  recurringInterval: string
  parentId: string
  children: ProjectExpenseType[]
}

const processProjectExpenses = (
  projectExpenses: ProjectExpenseType[]
): ProjectExpenseType[] => {
  const array = JSON.parse(JSON.stringify(projectExpenses))
  const tree: ProjectExpenseType[] = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i] as ProjectExpenseType

    if (item.parentId) {
      const parent = array.filter((elem) => elem.id === item.parentId).pop()
      if (!parent.children) {
        parent.children = []
      }
      parent.children.push(item)
    } else {
      tree.push(item)
    }
  }

  return tree
}

const ProjectExpense = ({ projectExpense, onDeleteButtonClick }) => {
  return (
    <Box key={projectExpense.id} sx={{ mb: '4px' }}>
      <div>
        <b>{projectExpense.name}</b>
        <IconButton
          size="small"
          sx={{ ml: 1 }}
          onClick={() => onDeleteButtonClick(projectExpense.id)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
      {projectExpense.description && (
        <Typography sx={{ color: 'text.secondary' }}>
          {projectExpense.description}
        </Typography>
      )}
      {projectExpense.children?.length > 0 && (
        <Box sx={{ ml: 2 }}>
          {projectExpense.children.map((child) => {
            return (
              <ProjectExpense
                key={child.id}
                projectExpense={child}
                onDeleteButtonClick={onDeleteButtonClick}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}

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
  const confirm = useConfirm()
  const setProjectExpenses = useSetRecoilState(projectExpensesState)

  const processedProjectExpenses = useMemo(() => {
    return processProjectExpenses(data?.projectExpenses || [])
  }, [data])

  useEffect(() => {
    setProjectExpenses(processedProjectExpenses)
  }, [setProjectExpenses, processedProjectExpenses])

  const onDeleteButtonClick = async (id: string) => {
    try {
      await confirm({
        description:
          'Are you sure you want to delete this expense? This action is irreversible!',
      })

      deleteProjectExpense({
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

  if (data.projectExpenses.length === 0) {
    return <Box sx={{ mb: 2 }}>No project expenses yet</Box>
  }

  return (
    <Box sx={{ mb: 2 }}>
      {processedProjectExpenses.map((projectExpense) => {
        return (
          <ProjectExpense
            key={projectExpense.id}
            projectExpense={projectExpense}
            onDeleteButtonClick={onDeleteButtonClick}
          />
        )
      })}
    </Box>
  )
}

export default ProjectExpenses
