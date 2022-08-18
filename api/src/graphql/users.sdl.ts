export const schema = gql`
  type User {
    id: String!
    username: String!
    email: String!
    hashedPassword: String!
    salt: String!
    name: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
    projects: [Project]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    username: String!
    email: String!
    hashedPassword: String!
    salt: String!
    name: String!
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  input UpdateUserInput {
    username: String
    email: String
    hashedPassword: String
    salt: String
    name: String
    resetToken: String
    resetTokenExpiresAt: DateTime
    roles: [String]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`
