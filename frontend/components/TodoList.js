"use client";

import { useQuery, useMutation, gql } from "@apollo/client";
import { X, CheckSquare, Square } from "lucide-react";

const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      title
      completed
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: ID!) {
    toggleTodo(id: $id) {
      _id
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id)
  }
`;

export default function TodoList() {
  const { data, loading, error } = useQuery(GET_TODOS);
  const [toggleTodo] = useMutation(TOGGLE_TODO, { refetchQueries: [{ query: GET_TODOS }] });
  const [deleteTodo] = useMutation(DELETE_TODO, { refetchQueries: [{ query: GET_TODOS }] });

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading todos.</p>;

  return (
    <ul className="space-y-2">
      {data.todos.map((todo) => (
        <li
          key={todo._id}
          className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 p-3 rounded shadow"
        >
          <button onClick={() => toggleTodo({ variables: { id: todo._id } })}>
            {todo.completed ? (
              <CheckSquare className="text-green-500" />
            ) : (
              <Square className="text-gray-400" />
            )}
          </button>
          <span className={`flex-1 mx-3 ${todo.completed ? "line-through text-gray-500" : ""}`}>
            {todo.title}
          </span>
          <button
            onClick={() => deleteTodo({ variables: { id: todo._id } })}
            className="text-red-500 hover:text-red-700"
            aria-label="Delete todo"
          >
            <X />
          </button>
        </li>
      ))}
    </ul>
  );
}
