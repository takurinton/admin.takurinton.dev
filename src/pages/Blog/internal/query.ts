import { gql } from "urql";

export const getPostsQuery = gql`
  query postsQuery {
    getPosts {
      results {
        id
        title
        contents
        category
        pub_date
        open
      }
    }
  }
`;

export const getPostQuery = gql`
  query postQuery($id: Int) {
    getPost(id: $id) {
      id
      title
      contents
      pub_date
      category
      open
      categories {
        id
        name
      }
    }
  }
`;

export const getCategoriesQuery = gql`
  query categoriesQuery {
    getCategories {
      id
      name
    }
  }
`;

export const createPostMutation = gql`
  mutation createPostMutation(
    $title: String!
    $contents: String!
    $category: Int!
    $pub_date: String!
    $open: Boolean!
  ) {
    createPost(
      title: $title
      contents: $contents
      category: $category
      pub_date: $pub_date
      open: $open
    ) {
      title
      contents
      pub_date
      category
      open
    }
  }
`;

export const updatePostMutation = gql`
  mutation updatePostMutation(
    $id: Int!
    $title: String!
    $contents: String!
    $category: Int!
    $pub_date: String!
    $open: Boolean!
  ) {
    updatePost(
      id: $id
      title: $title
      contents: $contents
      category: $category
      pub_date: $pub_date
      open: $open
    ) {
      id
      title
      contents
      pub_date
      category
      open
    }
  }
`;

export const removePostMutation = gql`
  mutation removePostMutation($id: Int!) {
    removePost(id: $id) {
      id
      title
      contents
      pub_date
      category
      open
    }
  }
`;
