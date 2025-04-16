import { typeDefs } from "./baseSchema.js";
import { eventTypeDefs } from "./eventSchema.js";
import { userTypeDefs } from "./userSchema.js";

export const allTypeDefs = [typeDefs, eventTypeDefs, userTypeDefs];
