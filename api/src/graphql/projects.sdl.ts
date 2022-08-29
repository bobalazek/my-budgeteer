export const schema = gql`
  type Project {
    id: String!
    name: String!
    description: String
    currencySymbol: String!
    costEstimated: Float
    isPublic: Boolean!
    categoryId: String
    category: Category
    userId: String
    user: User
    projectVariables: [ProjectVariable]!
    projectExpenses: [ProjectExpense]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    projects: [Project!]! @requireAuth
    project(id: String!): Project @requireAuth
  }

  input CreateProjectInput {
    name: String!
    description: String!
    currencySymbol: String!
    costEstimated: Float
    isPublic: Boolean!
    isTemplate: Boolean!
    categoryId: String
    userId: String
  }

  input UpdateProjectInput {
    name: String
    description: String
    currencySymbol: String
    costEstimated: Float
    isPublic: Boolean
    isTemplate: Boolean
    categoryId: String
    userId: String
  }

  input CloneProjectInput {
    name: String
  }

  type Mutation {
    createProject(input: CreateProjectInput!): Project! @requireAuth
    updateProject(id: String!, input: UpdateProjectInput!): Project!
      @requireAuth
    cloneProject(id: String!, input: CloneProjectInput!): Project! @requireAuth
    deleteProject(id: String!): Project! @requireAuth
  }
`
