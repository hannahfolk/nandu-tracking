import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FiTrash2, FiEdit, FiCheck, FiX } from "react-icons/fi";

import { DELETE_TODO, UPDATE_TODO } from "../graphql/mutations";

const TodoItem = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [deleteTodo, { loading: isDeleting }] = useMutation(DELETE_TODO);

  const [updateTodo] = useMutation(UPDATE_TODO, {
    optimisticResponse: {
      __typename: "Mutation",
      updateTodo: {
        __typename: "Todo",
        id: todo.id,
        title: isEditing ? editedTitle : todo.title,
        completed: !todo.completed,
      },
    },
  });

  const handleDelete = () => {
    deleteTodo({
      variables: { id: todo.id },
      update(cache) {
        cache.modify({
          fields: {
            todos(existingTodos = [], { readField }) {
              return existingTodos.filter((todoRef) => todo.id !== readField("id", todoRef));
            },
          },
        });
      },
    });
  };

  const handleToggle = () => {
    updateTodo({
      variables: {
        id: todo.id,
        completed: !todo.completed,
      },
    });
  };

  const handleEdit = () => {
    if (isEditing && editedTitle.trim() !== todo.title) {
      updateTodo({
        variables: {
          id: todo.id,
          title: editedTitle,
        },
      });
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    setEditedTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-lg transition-all duration-200 animate-fade-in ${
        todo.completed ? "bg-green-50" : "bg-white"
      } shadow-sm hover:shadow-md`}
    >
      <div className="flex items-center w-full">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 h-5 w-5 rounded-full border mr-3 flex items-center justify-center transition-colors ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-blue-500"
          }`}
        >
          {todo.completed && <FiCheck size={12} />}
        </button>

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="flex-1 px-2 py-1 border-b border-blue-500 focus:outline-none bg-transparent"
            autoFocus
          />
        ) : (
          <span
            className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-gray-800"}`}
          >
            {todo.title}
          </span>
        )}
      </div>

      <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-green-600 hover:text-green-800"
              title="Save"
            >
              <FiCheck size={18} />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-1 text-red-600 hover:text-red-800"
              title="Cancel"
            >
              <FiX size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEdit}
              className="p-1 text-blue-600 hover:text-blue-800"
              title="Edit"
            >
              <FiEdit size={16} />
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`p-1 ${isDeleting ? "text-gray-400" : "text-red-600 hover:text-red-800"}`}
              title="Delete"
            >
              {isDeleting ? "..." : <FiTrash2 size={16} />}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
