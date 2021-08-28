export const graphqlURL: string = 'http://localhost:3001/graphql'
export const squery: string = `query User {
  getAlluser {
    id
    createdAt
    updatedAt
    phone
  }
}`
