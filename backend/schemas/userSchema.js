import { gql } from "apollo-server-express";

export const userTypeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    createdAt: String!
    events: [Event!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Mutation {
    logout: LogoutResponse!
  }

  type LogoutResponse {
    success: Boolean!
  }

  extend type Query {
    me: User
    users: [User!]!
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
    updateProfile(username: String, email: String, password: String): User!
  }
`;
