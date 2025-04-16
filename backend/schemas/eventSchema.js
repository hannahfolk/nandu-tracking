import { gql } from "apollo-server-express";

export const eventTypeDefs = gql`
  type Event {
    id: ID!
    chineseName: String!
    englishName: String!
    code: String!
    createdAt: String!
  }

  input EventInput {
    chineseName: String!
    englishName: String!
    code: String!
  }

  extend type Query {
    events: [Event]
    event(id: ID!): Event
    eventByCode(code: String!): Event
  }

  extend type Mutation {
    createEvent(input: EventInput!): Event!
    createEvents(input: [EventInput!]!): [Event!]!
  }
`;
