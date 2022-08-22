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
  mutation CreateProjectVariableMutation($input: CreateProjectVariableInput!) {
    createProjectVariable(input: $input) {
      id
    }
  }
`

export const DELETE_PROJECT_VARIABLE_MUTATION = gql`
  mutation DeleteProjectVariableMutation($id: String!) {
    deleteProjectVariable(id: $id) {
      id
    }
  }
`
