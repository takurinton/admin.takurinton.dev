import { Flex, Spinner } from "ingred-ui";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { getPostQuery } from "../internal/query";
import { BlogEditForm } from "./internal/Form";

export const BlogEdit = () => {
  // @ts-ignore
  const { id } = useParams();
  const [results] = useQuery({
    query: getPostQuery,
    variables: {
      id: Number(id),
    },
  });

  return (
    <>
      {results.fetching ? (
        <Flex
          style={{
            width: "fit-content",
            margin: "auto",
            padding: "40px",
          }}
        >
          <Spinner />
        </Flex>
      ) : (
        <BlogEditForm
          id={id}
          title={results.data.getPost.title}
          contents={results.data.getPost.contents}
          pub_date={results.data.getPost.pub_date}
          open={results.data.getPost.open}
          category={results.data.getPost.category}
          categories={results.data.getPost.categories}
        />
      )}
    </>
  );
};
