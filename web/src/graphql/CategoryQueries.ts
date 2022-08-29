export const GET_CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`

export const GET_CATEGORY_QUERY = gql`
  query GetCategory($id: String!) {
    category(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`

export const DELETE_CATEGORY_MUTATION = gql`
  mutation DeleteCategory($id: String!) {
    deleteCategory(id: $id) {
      id
    }
  }
`

export const UPDATE_CATEGORY_MUTATION = gql`
  mutation UpdateCategory($id: String!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`
