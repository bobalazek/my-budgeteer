export const schema = gql`
  type Project {
    id: String!
    name: String!
    description: String
    currencySymbol: String!
    costEstimated: Float
    isPublic: Boolean!
    isTemplate: Boolean!
    categoryId: String
    category: Category
    userId: String
    user: User
    projectVariables: [ProjectVariable]!
    projectExpenses: [ProjectExpense]!
    createdAt: DateTime!
    updatedAt: DateTime!
    permissions: ProjectPermissions!
  }

  type ProjectPermissions {
    allowRead: Boolean!
    allowUpdate: Boolean!
    allowDelete: Boolean!
    allowClone: Boolean!
    allowExpensesCreate: Boolean!
    allowExpensesRead: Boolean!
    allowExpensesUpdate: Boolean!
    allowExpensesDelete: Boolean!
    allowVariablesCreate: Boolean!
    allowVariablesRead: Boolean!
    allowVariabesUpdate: Boolean!
    allowVariablesDelete: Boolean!
  }

  type Query {
    projects: [Project!]! @requireAuth
    projectTemplates: [Project!]! @requireAuth
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
