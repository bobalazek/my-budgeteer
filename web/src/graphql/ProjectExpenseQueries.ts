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

export const CREATE_PROJECT_EXPENSE_MUTATION = gql`
  mutation CreateProjectExpenseMutation($input: CreateProjectExpenseInput!) {
    createProjectExpense(input: $input) {
      id
    }
  }
`

export const DELETE_PROJECT_EXPENSE_MUTATION = gql`
  mutation DeleteProjectExpenseMutation($id: String!) {
    deleteProjectExpense(id: $id) {
      id
    }
  }
`
