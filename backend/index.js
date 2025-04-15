import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config({ path: '.env.local' });

import { typeDefs, resolvers } from "./graphql/schema.js";
import clientPromise from "./lib/mongodb.js";


const startServer = async () => {
  const app = express();
  const port = process.env.PORT || 4000;

  app.use(cors());

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => {
      const client = await clientPromise;
      const db = client.db();
      return { db };
    },
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  app.listen(port, () => {
    console.log(
      `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
    );
  });
};

startServer();
