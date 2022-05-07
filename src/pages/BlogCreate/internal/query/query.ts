import { gql } from "urql";

export const query = gql`
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
