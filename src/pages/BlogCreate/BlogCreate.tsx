import { useQuery } from "urql";
import { BlogCreateForm } from "./internal/Form";
import { query } from "./internal/query/query";

export const BlogCreate = () => {
  const [results] = useQuery({ query });

  return (
    <>
      {results.fetching ? (
        <></>
      ) : (
        <BlogCreateForm categories={results.data.getCategories} />
      )}
    </>
  );
};
