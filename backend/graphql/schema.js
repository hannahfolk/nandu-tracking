import { gql } from "apollo-server-express";
import { ObjectId } from "mongodb";

export const typeDefs = gql`
  type Todo {
    _id: ID!
    title: String!
    completed: Boolean!
  }

  type Query {
    todos: [Todo!]!
    todo(id: ID!): Todo
  }

  type Mutation {
    addTodo(title: String!): Todo!
    updateTodo(id: ID!, title: String, completed: Boolean): Todo!
    deleteTodo(id: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    todos: async (_, __, { db }) => {
      return await db.collection("todos").find({}).toArray();
    },
    todo: async (_, { id }, { db }) => {
      return await db.collection("todos").findOne({ _id: new ObjectId(id) });
    },
  },

  Mutation: {
    addTodo: async (_, { title }, { db }) => {
      const newTodo = { title, completed: false };
      const result = await db.collection("todos").insertOne(newTodo);
      return { _id: result.insertedId, ...newTodo };
    },
    updateTodo: async (_, { id, title, completed }, { db }) => {
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (completed !== undefined) updates.completed = completed;
      await db
        .collection("todos")
        .updateOne({ _id: new ObjectId(id) }, { $set: updates });
      return await db.collection("todos").findOne({ _id: new ObjectId(id) });
    },
    deleteTodo: async (_, { id }, { db }) => {
      const result = await db
        .collection("todos")
        .deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount === 1;
    },
  },
};
