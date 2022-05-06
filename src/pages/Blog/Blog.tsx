import { Badge, ContextMenu, DataTable, Flex, Spinner } from "ingred-ui";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "urql";
import { useQueryParams } from "./internal/hooks/useQueryParams";
import { query } from "./internal/query/query";

const initialState = [
  { id: 0, title: "", contents: "", open: false, category: "", pub_date: "" },
];

export const Blog = () => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const page = queryParams.get("page") ?? 1;
  const category = queryParams.get("category") ?? "";
  const [posts, setPosts] = useState(initialState);

  const [results] = useQuery({
    query,
  });

  useEffect(() => {
    if (results.data) {
      if (category !== "") {
        setPosts(
          results.data.getPosts.results.filter(
            (post: any) => post.category === category
          )
        );
      } else {
        setPosts(results.data.getPosts.results);
      }
    }
  }, [results, history.location.pathname]);

  const args = {
    data: posts,
    columns: [
      {
        name: "id",
        selector: (data: any) => data.id,
      },
      {
        name: "title",
        selector: (data: any) => data.title,
      },
      {
        name: "is_open",
        selector: (data: any) =>
          data.open ? (
            <Badge color="success" fontSize="12px">
              公開中
            </Badge>
          ) : (
            <Badge color="danger" fontSize="12px">
              非公開
            </Badge>
          ),
      },
      {
        name: "category",
        selector: (data: any) => (
          <Link to={`/blog/?category=${data.category}`}>
            <Badge color="primary" fontSize="12px">
              {data.category}
            </Badge>
          </Link>
        ),
      },
      {
        name: "created_at",
        selector: (data: any) => data.pub_date,
      },
      {
        name: "detail",
        selector: (data: any) => (
          <ContextMenu
            contents={[
              {
                text: "編集",
                onClick: () => {
                  history.push(`/blog/edit/${data.id}`);
                },
                type: "default",
              },
              {
                text: data.open ? "非公開にする" : "公開する",
                onClick: () => {
                  console.log("onClick data.open");
                  // TODO
                },
                type: "default",
              },
              {
                text: "削除",
                onClick: () => {
                  console.log("onClick data.delete");
                  // TODO
                },
                type: "warning",
              },
            ]}
          />
        ),
      },
    ],
  };

  return (
    <Flex>
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
        <Flex>
          <DataTable {...args} />
        </Flex>
      )}
    </Flex>
  );
};
