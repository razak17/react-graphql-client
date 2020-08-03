import { gql } from "apollo-boost";
import { USER_INFO, POST_INFO } from "./fragments";

export const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...userInfo
    }
  }
  ${USER_INFO}
`;

export const CREATE_USER = gql`
  mutation createUser {
    createUser {
      username
      email
    }
  }
`;

export const UPDATE_POST = gql`
  mutation updatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      ...postInfo
    }
  }
  ${POST_INFO}
`;

export const CREATE_POST = gql`
  mutation createPost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...postInfo
    }
  }
  ${POST_INFO}
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: String!) {
    deletePost(postId: $postId) {
      _id
    }
  }
`;
