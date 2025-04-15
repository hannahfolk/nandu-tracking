// backend/resolvers/userResolvers.js
import User from "../models/User.js";
import Todo from "../models/Todo.js";
import bcrypt from "bcryptjs";

export const userResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.id).populate("todos");
    },
    users: async () => await User.find().populate("todos"),
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email already in use");

      const user = new User({ username, email, password });
      await user.save();

      const token = user.generateAuthToken();
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Invalid credentials");

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) throw new Error("Invalid credentials");

      const token = user.generateAuthToken();
      return { token, user };
    },
  },
  User: {
    todos: async (user) => await Todo.find({ user: user.id }),
  },
};
