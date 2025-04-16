import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    events {
      chineseName
      englishName
      code
    }
  }
`;

export const GET_USER_EVENTS = gql`
  query GetUserEvents {
    me {
      id
      username
      events {
        id
        chineseName
        englishName
        code
      }
    }
    events {
      id
      chineseName
      englishName
      code
    }
  }
`;
