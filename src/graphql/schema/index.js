const { gql } = require("apollo-server-express");

const schema = gql`
  type User {
    _id: ID!
    name: String!
    userType: String!
    email: String!
    password: String!
  }

  input UserInput {
    name: String!
    userType: String!
    email: String!
    password: String!
  }

  type Query {
    getUser: [User!]!
    login(email: String!, password: String!): User!
  }

  type Mutation {
    createUser(input: UserInput): User
    updateUser(id: ID!, input: UserInput): User
  }
`;

module.exports = schema;
