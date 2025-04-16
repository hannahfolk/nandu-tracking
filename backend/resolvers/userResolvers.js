import bcrypt from "bcryptjs";

import { User } from "../models/index.js";

export const userResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) throw new Error("Not authenticated");
      return await User.findById(user.id).populate("events");
    },
    users: async () => await User.find(),
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
    updateProfile: async (_, { username, email, password }, { user }) => {
      if (!user) throw new Error("Not authenticated");

      const updates = {};
      if (username) updates.username = username;
      if (email) updates.email = email;
      if (password) updates.password = await bcrypt.hash(password, 10);

      return await User.findByIdAndUpdate(user.id, updates, { new: true });
    },
    logout: () => {
      return { success: true };
    },
  },
  User: {
    events: async (user) => {
      await user.populate("events");
      return user.events;
    },
  },
};
