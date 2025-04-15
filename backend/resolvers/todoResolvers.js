import Todo from "../models/Todo.js";

export const todoResolvers = {
  Query: {
    todos: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await Todo.find({ user: user.id }).sort({ createdAt: -1 });
    },
    todo: async (_, { id }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await Todo.findOne({ _id: id, user: user.id });
    },
  },
  Mutation: {
    createTodo: async (_, { title }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const todo = new Todo({ title, user: user.id });
      await todo.save();
      return todo;
    },
    updateTodo: async (_, { id, title, completed }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      const update = {};
      if (title !== undefined) update.title = title;
      if (completed !== undefined) update.completed = completed;

      return await Todo.findOneAndUpdate({ _id: id, user: user.id }, update, { new: true });
    },
    deleteTodo: async (_, { id }, { user }) => {
      if (!user) throw new Error("Not authenticated");
      await Todo.findOneAndDelete({ _id: id, user: user.id });
      return true;
    },
  },
};
