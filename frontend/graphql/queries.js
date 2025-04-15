import { gql } from '@apollo/client';

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      title
      completed
      createdAt
    }
  }
`;

export const TODO_FRAGMENT = gql`
  fragment TodoItem on Todo {
    id
    title
    completed
    createdAt
  }
`;