export const schema = gql`
  type ProjectVariable {
    id: String!
    name: String!
    value: String!
    type: String!
    projectId: String!
    project: Project!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    projectVariables: [ProjectVariable!]! @requireAuth
    projectVariable(id: String!): ProjectVariable @requireAuth
  }

  input CreateProjectVariableInput {
    name: String!
    value: String!
    type: String!
    projectId: String!
  }

  input UpdateProjectVariableInput {
    name: String
    value: String
    type: String
    projectId: String
  }

  type Mutation {
    createProjectVariable(input: CreateProjectVariableInput!): ProjectVariable!
      @requireAuth
    updateProjectVariable(
      id: String!
      input: UpdateProjectVariableInput!
    ): ProjectVariable! @requireAuth
    deleteProjectVariable(id: String!): ProjectVariable! @requireAuth
  }
`
