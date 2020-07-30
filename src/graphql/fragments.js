import { gql } from "apollo-boost";

export const USER_INFO = gql`
  fragment userInfo on User {
    _id
    username
    email
    images {
      url
      public_id
    }
    about
    createdAt
    updatedAt
  }
`;

export const POST_INFO = gql`
  fragment postInfo on Post {
    _id
    content
    image {
      url
      public_id
    }
    postedBy {
      _id
      username
    }
  }
`;
