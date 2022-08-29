export const schema = gql`
  type Permissions {
    allowCreate: Boolean!
    allowRead: Boolean!
    allowUpdate: Boolean!
    allowDelete: Boolean!
    allowClone: Boolean!
  }
`
