export const GET_USERS_QUERY = gql`
  query GetUsers {
    users {
      id
      username
      email
      hashedPassword
      salt
      name
      resetToken
      resetTokenExpiresAt
      roles
      createdAt
      updatedAt
    }
  }
`

export const GET_USER_QUERY = gql`
  query GetUser($id: String!) {
    user(id: $id) {
      id
      username
      email
      hashedPassword
      salt
      name
      resetToken
      resetTokenExpiresAt
      roles
      createdAt
      updatedAt
    }
  }
`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      id
    }
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
      username
      email
      hashedPassword
      salt
      name
      resetToken
      resetTokenExpiresAt
      roles
      createdAt
      updatedAt
    }
  }
`
