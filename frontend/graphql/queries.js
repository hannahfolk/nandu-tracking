import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query GetAllEvents {
    events {
      id
      chineseName
      englishName
      code
    }
  }
`;
