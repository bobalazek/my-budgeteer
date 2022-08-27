export const GET_PROJECT_QUERY = gql`
  query GetProject($id: String!) {
    project(id: $id) {
      id
      name
      description
      currencySymbol
      isPublic
      costEstimated
      categoryId
      category {
        name
      }
      createdAt
      updatedAt
    }
  }
`

export const DELETE_PROJECT_MUTATION = gql`
  mutation DeleteProjectMutation($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`

export const CLONE_PROJECT_MUTATION = gql`
  mutation CloneProjectMutation($id: String!, $input: CloneProjectInput!) {
    cloneProject(id: $id, input: $input) {
      id
    }
  }
`
