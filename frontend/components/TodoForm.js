"use client";

import { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const CREATE_TODO = gql`
  mutation CreateTodo($title: String!) {
    createTodo(title: $title) {
      _id
      title
      completed
    }
  }
`;

export default function TodoForm() {
  const [title, setTitle] = useState("");
  const [createTodo] = useMutation(CREATE_TODO, {
    refetchQueries: ["GetTodos"],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await createTodo({ variables: { title } });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
}
