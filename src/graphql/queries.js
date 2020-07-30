import { gql } from "apollo-boost";
import { USER_INFO, POST_INFO } from "./fragments";

export const PROFILE = gql`
  query {
    profile {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GET_ALL_USERS = gql`
  query {
    allUsers {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GET_USER_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const GET_ALL_POSTS = gql`
  {
    allPosts {
      ...postInfo
    }
  }
  ${POST_INFO}
`;

export const USER_POSTS = gql`
  query {
    userPosts {
      ...postInfo
    }
  }
  ${POST_INFO}
`;
