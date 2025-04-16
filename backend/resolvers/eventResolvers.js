import { UserInputError } from "apollo-server-express";

import { Event } from "../models/index.js";

export const eventResolvers = {
  Query: {
    events: async () => await Event.find().sort({ createdAt: -1 }),
    event: async (_, { id }) => await Event.findById(id),
    eventByCode: async (_, { code }) => {
      return await Event.findOne({ code: code.toUpperCase() });
    },
  },
  Mutation: {
    createEvent: async (_, { input }) => {
      try {
        const event = new Event({
          chineseName: input.chineseName,
          englishName: input.englishName,
          code: input.code.toUpperCase(),
        });
        await event.save();
        return event;
      } catch (err) {
        if (err.code === 11000) {
          throw new UserInputError("Event code already exists");
        }
        throw err;
      }
    },
    createEvents: async (_, { input }) => {
      try {
        // Convert all codes to uppercase
        const events = input.map((event) => ({
          ...event,
          code: event.code.toUpperCase(),
        }));

        // Insert many with validation
        const createdEvents = await Event.insertMany(events);
        return createdEvents;
      } catch (err) {
        if (err.code === 11000) {
          throw new UserInputError("Duplicate event code found");
        }
        throw err;
      }
    },
  },
};