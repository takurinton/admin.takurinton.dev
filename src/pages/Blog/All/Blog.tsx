import {
  Badge,
  Button,
  ConfirmModal,
  ContextMenu,
  DataTable,
  Flex,
  Spinner,
  Toast,
} from "ingred-ui";
import { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { getPostsQuery, removePostMutation } from "../internal/query";
import { useQueryParams } from "./internal/hooks/useQueryParams";

const initialState = [
  { id: 0, title: "", contents: "", open: false, category: "", pub_date: "" },
];

export const Blog = () => {
  const history = useHistory();
  const queryParams = useQueryParams();
  const category = queryParams.get("category") ?? "";
  const [posts, setPosts] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    selectedId: 0,
  });
  const { addToast } = Toast.useToasts();

  const [results] = useQuery({
    query: getPostsQuery,
  });

  const [_, removePost] = useMutation(removePostMutation);

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

  const handleRemove = useCallback((id: number) => {
    removePost({ id }).then((result) => {
      if (result.error) {
        addToast(`id ${id} の投稿の削除に失敗しました。`, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        addToast(`id ${id} の投稿の削除に成功しました。`, {
          appearance: "success",
          autoDismiss: true,
        });
      }
    });
  }, []);

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
                text: "analytics を見る",
                onClick: () => {
                  history.push(
                    `/analytics/detail/?domain=blog.takurinton.dev&path=/post/${data.id}`
                  );
                },
                type: "default",
              },
              {
                text: "削除",
                onClick: () => {
                  setModalState({
                    isOpen: true,
                    selectedId: data.id,
                  });
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
          <Flex style={{ width: "150px", paddingBottom: "20px" }}>
            <Button
              onClick={() => {
                history.push("/blog/create");
              }}
            >
              新規作成
            </Button>
          </Flex>
          <ConfirmModal
            title="投稿を削除します"
            isOpen={modalState.isOpen}
            onClose={() => {
              setModalState({ ...modalState, isOpen: false });
            }}
            onSubmit={() => {
              handleRemove(modalState.selectedId);
            }}
          >
            {`id: ${modalState.selectedId} の投稿を削除します。`}
          </ConfirmModal>
          <DataTable {...args} />
        </Flex>
      )}
    </Flex>
  );
};
