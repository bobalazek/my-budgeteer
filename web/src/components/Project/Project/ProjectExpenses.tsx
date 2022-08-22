import { useCallback, useEffect, useMemo } from 'react'

import { Box } from '@mui/material'
import { useConfirm } from 'material-ui-confirm'
import { useSetRecoilState } from 'recoil'

import { useMutation, useQuery } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'

import {
  DELETE_PROJECT_EXPENSE_MUTATION,
  GET_PROJECT_EXPENSES_QUERY,
  UPDATE_PROJECT_EXPENSE_MUTATION,
} from 'src/graphql/ProjectExpenseQueries'
import { projectExpensesState } from 'src/state/ProjextExpensesState'

import ProjectExpense from './ProjectExpense'

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
  const array = JSON.parse(
    JSON.stringify(projectExpenses)
  ) as typeof projectExpenses
  const tree: ProjectExpenseType[] = []

  for (let i = 0; i < array.length; i++) {
    const item = array[i]

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
  const [updateProjectExpense] = useMutation(UPDATE_PROJECT_EXPENSE_MUTATION, {
    onCompleted: () => {
      toast.success('Project expense updated')
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

  const onEntryDeleteButtonClick = useCallback(
    async (projectExpense: ProjectExpenseType) => {
      try {
        await confirm({
          content: (
            <>
              Are you sure you want to delete the &quot;
              <b>{projectExpense.name}</b>&quot; expense? This action is
              irreversible!
            </>
          ),
        })

        deleteProjectExpense({
          variables: {
            id: projectExpense.id,
          },
        })
      } catch (err) {
        // Nothing to do
      }
    },
    [confirm, deleteProjectExpense]
  )

  const onEntryUpdate = useCallback(
    (id: string, input: any) => {
      updateProjectExpense({
        variables: {
          id,
          input,
        },
      })
    },
    [updateProjectExpense]
  )

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
      {processedProjectExpenses.map((projectExpense, index) => {
        return (
          <ProjectExpense
            key={projectExpense.id}
            projectExpense={projectExpense}
            index={index}
            level={0}
            onDeleteButtonClick={onEntryDeleteButtonClick}
            onUpdate={onEntryUpdate}
          />
        )
      })}
    </Box>
  )
}

export default ProjectExpenses
