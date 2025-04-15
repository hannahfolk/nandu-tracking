import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { gql, useQuery, useMutation } from "@apollo/client";

import { ME } from "../graphql/authMutations";
import { CREATE_TODO } from "../graphql/mutations";
import TodoList from "../components/TodoList";
import AuthGuard from "../components/AuthGuard";

export default function Home() {
  const router = useRouter();
  const { data, loading, error } = useQuery(ME);

  const [title, setTitle] = useState("");
  const [createTodo, { loading: isCreating, error: createError }] = useMutation(CREATE_TODO, {
    update(cache, { data: { createTodo } }) {
      cache.modify({
        fields: {
          todos(existingTodos = []) {
            const newTodoRef = cache.writeFragment({
              data: createTodo,
              fragment: gql`
                fragment NewTodo on Todo {
                  id
                  title
                  completed
                  createdAt
                }
              `,
            });
            return [newTodoRef, ...existingTodos];
          },
        },
      });
    },
    onCompleted: () => setTitle(""),
  });

  useEffect(() => {
    if (!loading && error) {
      router.push("/login");
    }
  }, [loading, error, router]);

  if (loading) return <div className="flex justify-center p-8">Loading...</div>;
  if (error) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      await createTodo({
        variables: { title },
        optimisticResponse: {
          __typename: "Mutation",
          createTodo: {
            __typename: "Todo",
            id: `temp-${Date.now()}`,
            title: title.trim(),
            completed: false,
            createdAt: new Date().toISOString(),
          },
        },
      });
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xs mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200">
              <div className="flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="What needs to be done?"
                  className="flex-1 min-w-0 block w-full px-3 py-1.5 rounded-l-md border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled={isCreating}
                />
                <button
                  type="submit"
                  disabled={!title.trim() || isCreating}
                  className={`inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-r-md text-white ${
                    !title.trim() || isCreating
                      ? "bg-indigo-300"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
                  {isCreating ? "Adding..." : "Add"}
                </button>
              </div>
            </form>

            <div className="p-4">
              <TodoList />
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Drag and drop to reorder list</p>
            <p className="mt-1">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {createError && (
            <div className="mt-2 text-sm text-red-600">
              Failed to create todo: {createError.message}
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
