import { gql } from "apollo-server-express";

export const todoTypeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    createTodo(title: String!): Todo!
    updateTodo(id: ID!, title: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;
