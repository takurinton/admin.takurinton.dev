import { gql } from "urql";

export const query = gql`
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
