import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./schemas/index.js";
import { resolvers } from "./resolvers/index.js";
import connectDB from "./config/db.js";

dotenv.config();

const startServer = async () => {
  const app = express();

  await connectDB();

  // Authentication middleware
  app.use((req, res, next) => {
    const token = req.headers.authorization || "";
    try {
      if (token) {
        const user = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = user;
      }
    } catch (error) {
      console.log("Invalid token");
    }
    next();
  });

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`);
  });
};

startServer();
