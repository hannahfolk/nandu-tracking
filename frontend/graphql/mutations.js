import { gql } from "@apollo/client";

export const UPDATE_USER_EVENTS = gql`
  mutation UpdateUserEvents($eventIds: [ID!]!) {
    updateUserEvents(eventIds: $eventIds) {
      id
      events {
        id
        chineseName
        englishName
        code
      }
    }
  }
`;
