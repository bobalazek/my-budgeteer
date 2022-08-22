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
