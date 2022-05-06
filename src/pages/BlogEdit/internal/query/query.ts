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
    }
  }
`;
