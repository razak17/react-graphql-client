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

export const GET_TOTAL_POSTS = gql`
  query {
    totalPosts
  }
`;
export const GET_ALL_POSTS = gql`
  query allPosts($page: Int!) {
    allPosts(page: $page) {
      ...postInfo
    }
  }
  ${POST_INFO}
`;

export const GET_USER_POSTS = gql`
  query {
    userPosts {
      ...postInfo
    }
  }
  ${POST_INFO}
`;

export const GET_SINGLE_POST = gql`
  query singlePost($postId: String!) {
    singlePost(postId: $postId) {
      ...postInfo
    }
  }

  ${POST_INFO}
`;

export const GET_SEARCH_RESULTS = gql`
  query search($query: String!) {
    search(query: $query) {
      ...postInfo
    }
  }
  ${POST_INFO}
`;
