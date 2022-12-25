export const typeDefs = `#graphql

  type User {
    id: ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User]
    favoriteMovies: [Movie] # in gql, it's a good practice that when something is not of primitive type, we should create resolver 
    # of the type we are including it in
  }

  type Movie {
    id: ID!
    name: String!
    yearOfPublication: Int!
    isInTheaters: Boolean!
  }

# entry point to the graph
  type Query {
    # note:- friends: [User!] VS [User]!
    # this means prior friends can be null but the 
    # user inside can't be null
    # post means friends list cannot be null but
    # User can be null
    users: [User!]!
    user(id: ID!) : User
    movies: [Movie!]!
    movie(name: String!): Movie
  }

  input CreateUserInput {
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = INDIA
  }

  input UpdateUsernameInput {
    id: ID!
    newUsername: String!
  }

  input DeleteUserInput {
    id: ID!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User
    updateUsername(input: UpdateUsernameInput!): User
    deleteUser(input: DeleteUserInput!): User
  }

  enum Nationality {
    CANADA
    BRAZIL
    INDIA
    GERMANY
    CHILE
    UKRAINE
  }
`;
