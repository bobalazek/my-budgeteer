export const GET_PROJECTS_QUERY = gql`
  query GetProjects {
    projects {
      id
      name
      description
      currencySymbol
      isPublic
      isTemplate
      costEstimated
      categoryId
      category {
        name
      }
      createdAt
      updatedAt
      permissions {
        allowRead
        allowUpdate
        allowDelete
        allowClone
        allowExpensesCreate
        allowExpensesRead
        allowExpensesUpdate
        allowExpensesDelete
        allowVariablesCreate
        allowVariablesRead
        allowVariabesUpdate
        allowVariablesDelete
      }
    }
  }
`

export const GET_PROJECT_TEMPLATES_QUERY = gql`
  query GetProjectTemplates {
    projectTemplates {
      id
      name
      description
      currencySymbol
      isPublic
      isTemplate
      costEstimated
      categoryId
      category {
        name
      }
      createdAt
      updatedAt
      permissions {
        allowRead
        allowUpdate
        allowDelete
        allowClone
        allowExpensesCreate
        allowExpensesRead
        allowExpensesUpdate
        allowExpensesDelete
        allowVariablesCreate
        allowVariablesRead
        allowVariabesUpdate
        allowVariablesDelete
      }
    }
  }
`

export const GET_PROJECT_QUERY = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      currencySymbol
      isPublic
      isTemplate
      costEstimated
      categoryId
      category {
        name
      }
      createdAt
      updatedAt
      permissions {
        allowRead
        allowUpdate
        allowDelete
        allowClone
        allowExpensesCreate
        allowExpensesRead
        allowExpensesUpdate
        allowExpensesDelete
        allowVariablesCreate
        allowVariablesRead
        allowVariabesUpdate
        allowVariablesDelete
      }
    }
  }
`
export const CREATE_PROJECT_MUTATION = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      id
    }
  }
`

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`

export const CLONE_PROJECT_MUTATION = gql`
  mutation CloneProject($id: String!, $input: CloneProjectInput!) {
    cloneProject(id: $id, input: $input) {
      id
    }
  }
`

export const UPDATE_PROJECT_MUTATION = gql`
  mutation UpdateProject($id: String!, $input: UpdateProjectInput!) {
    updateProject(id: $id, input: $input) {
      id
      name
      description
      currencySymbol
      costEstimated
      isPublic
      isTemplate
      categoryId
      createdAt
      updatedAt
    }
  }
`
