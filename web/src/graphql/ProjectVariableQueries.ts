export const GET_PROJECT_VARIABLES_QUERY = gql`
  query GetProjectVariables($projectId: String!) {
    projectVariables(projectId: $projectId) {
      id
      name
      value
      type
      order
      createdAt
      updatedAt
    }
  }
`

export const CREATE_PROJECT_VARIABLE_MUTATION = gql`
  mutation CreateProjectVariable($input: CreateProjectVariableInput!) {
    createProjectVariable(input: $input) {
      id
    }
  }
`

export const DELETE_PROJECT_VARIABLE_MUTATION = gql`
  mutation DeleteProjectVariable($id: String!) {
    deleteProjectVariable(id: $id) {
      id
    }
  }
`

export const UPDATE_PROJECT_VARIABLE_MUTATION = gql`
  mutation UpdateProjectVariableMutation(
    $id: String!
    $input: UpdateProjectVariableInput!
  ) {
    updateProjectVariable(id: $id, input: $input) {
      id
    }
  }
`
