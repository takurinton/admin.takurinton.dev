import { useQuery } from "urql";
import { getCategoriesQuery } from "../internal/query";
import { BlogCreateForm } from "./internal/Form";

export const BlogCreate = () => {
  const [results] = useQuery({ query: getCategoriesQuery });

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
