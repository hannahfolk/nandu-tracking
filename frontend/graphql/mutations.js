import { gql } from "@apollo/client";

export const UPDATE_USER_EVENTS = gql`
  mutation UpdateUserEvents($eventId: ID!) {
    updateUserEvents(eventId: $eventId) {
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
