export const schema = gql`
  type ProjectExpense {
    id: String!
    name: String!
    description: String
    note: String
    recurringInterval: ProjectExpenseRecurringInterval!
    costRangeFrom: Float
    costRangeTo: Float
    costActual: Float
    progressPercentage: Float
    meta: JSON!
    conditions: JSON!
    links: JSON!
    tags: JSON!
    isArchived: Boolean!
    projectId: String!
    project: Project!
    parentId: String
    parent: ProjectExpense
    children: [ProjectExpense]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  enum ProjectExpenseRecurringInterval {
    NONE
    DAILY
    WEEKLY
    MONTHLY
    QUARTER_YEARLY
    HALF_YEARLY
    YEARLY
  }

  type Query {
    projectExpenses(projectId: String!): [ProjectExpense!]! @requireAuth
    projectExpense(id: String!): ProjectExpense @requireAuth
  }

  input CreateProjectExpenseInput {
    name: String!
    description: String
    note: String
    recurringInterval: ProjectExpenseRecurringInterval
    costRangeFrom: Float
    costRangeTo: Float
    costActual: Float
    progressPercentage: Float
    meta: JSON
    conditions: JSON
    links: JSON
    tags: JSON
    isArchived: Boolean
    projectId: String!
    parentId: String
  }

  input UpdateProjectExpenseInput {
    name: String
    description: String
    note: String
    recurringInterval: ProjectExpenseRecurringInterval
    costRangeFrom: Float
    costRangeTo: Float
    costActual: Float
    progressPercentage: Float
    meta: JSON
    conditions: JSON
    links: JSON
    tags: JSON
    isArchived: Boolean
    projectId: String
    parentId: String
  }

  type Mutation {
    createProjectExpense(input: CreateProjectExpenseInput!): ProjectExpense!
      @requireAuth
    updateProjectExpense(
      id: String!
      input: UpdateProjectExpenseInput!
    ): ProjectExpense! @requireAuth
    deleteProjectExpense(id: String!): ProjectExpense! @requireAuth
  }
`
