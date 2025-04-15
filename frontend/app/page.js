"use client";

import ThemeToggle from "@/components/ThemeToggle";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Todo App</h1>
        <ThemeToggle />
      </div>
      <TodoForm />
      <TodoList />
    </main>
  );
}
