import { gql } from "urql";

export const query = gql`
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
