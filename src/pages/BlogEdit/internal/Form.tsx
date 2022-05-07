import {
  Badge,
  Button,
  DatePicker,
  Flex,
  Input,
  Select,
  ToggleButton,
  Typography,
} from "ingred-ui";
import { marked } from "marked";
import moment from "moment";
import { ChangeEvent, useCallback, useEffect } from "react";
import styled from "styled-components";
import { useMutation } from "urql";
import { useForm } from "./hooks/useForm";
import { markdownStyle } from "./markdownRenderer";
import { updatePostMutation } from "./query/query";
import { renderStringToHtml } from "./renderStringToJSX";

const EditorContainer = styled.div``;

const ContentContainer = styled(Flex)`
  padding: ${({ theme }) => theme.spacing * 2}px 0;
`;

const EditColumnContainer = styled.div`
  margin: 0% 2% 0;
  width: 46%;
`;

export const BlogEditForm = ({
  id,
  title,
  contents,
  open,
  pub_date,
  category,
  categories,
}: {
  id: number;
  title: string;
  contents: string;
  open: boolean;
  pub_date: Date;
  category: string;
  categories: { id: number; name: string }[];
}) => {
  const [updatePostResult, updatePost] = useMutation(updatePostMutation);
  const { handleSubmit, handleChange, state } = useForm({
    id: Number(id),
    title,
    contents,
    open,
    category: categories.filter(({ name }) => category === name)[0].id,
    pub_date: moment(pub_date),
  });

  const getHight = (value: string) => {
    return `${value.split(" ").length}px`;
  };

  const handleKeydown = useCallback((event) => {
    if (event.key === "s" && event.metaKey) {
      event.preventDefault();
      handleSubmit(updatePost);
    }
  }, []);

  const getValueFromCategoryString = useCallback(
    (category: string) => {
      return categories.filter(({ name }) => category === name)[0];
    },
    [state.category]
  );

  const getCategoryFromCategoryValue = useCallback(
    (value: number) => {
      return categories.filter(({ id }) => value === id)[0];
    },
    [state.category]
  );

  useEffect(() => {
    addEventListener("keydown", handleKeydown);
    return () => removeEventListener("keydown", handleKeydown);
  });

  return (
    <EditorContainer>
      <ContentContainer display="flex" style={{ alignItems: "center" }}>
        <EditColumnContainer>{/* Empty */}</EditColumnContainer>
        <EditColumnContainer>
          <Flex style={{ width: "150px", margin: "0 0 0 auto" }}>
            <Button
              onClick={() => {
                handleSubmit(updatePost);
              }}
            >
              {state.open ? "保存" : "下書き保存"}
            </Button>
          </Flex>
        </EditColumnContainer>
      </ContentContainer>
      <ContentContainer display="flex" style={{ alignItems: "center" }}>
        <EditColumnContainer>
          <Input
            width="100%"
            placeholder="タイトル"
            value={state.title}
            name="title"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChange("title", target.value);
            }}
          />
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography component="h1" size="xxxxl" weight="bold">
            {state.title}
          </Typography>
        </EditColumnContainer>
      </ContentContainer>
      <ContentContainer display="flex" style={{ alignItems: "center" }}>
        <EditColumnContainer>
          <Select
            options={categories.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
            minWidth="100%"
            // @ts-ignore
            defaultValue={{
              label: category,
              value: getValueFromCategoryString(category).id,
            }}
            placeholder="カテゴリ選択"
            onChange={(newValue) => {
              // @ts-ignore
              handleChange("category", newValue.value);
            }}
          />
        </EditColumnContainer>
        <EditColumnContainer>
          <Badge color="primary" fontSize="12px" fontWeight="700">
            {getCategoryFromCategoryValue(state.category).name}
          </Badge>
        </EditColumnContainer>
      </ContentContainer>
      <ContentContainer display="flex">
        <EditColumnContainer>
          <Input
            multiline
            width="100%"
            value={state.contents}
            name="contents"
            placeholder="本文"
            height={getHight(state.contents)}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChange("contents", target.value);
            }}
          ></Input>
        </EditColumnContainer>
        <EditColumnContainer>
          {renderStringToHtml(
            marked.parse(state.contents, {
              renderer: markdownStyle(),
            })
          )}
        </EditColumnContainer>
      </ContentContainer>
      <ContentContainer display="flex">
        <EditColumnContainer>
          <ToggleButton
            active={state.open}
            activeText="公開"
            inActiveText="非公開"
            onChange={() => {
              handleChange("open", !state.open);
            }}
          />
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography>{state.open ? "公開" : "非公開"}</Typography>
        </EditColumnContainer>
      </ContentContainer>
      <ContentContainer display="flex">
        <EditColumnContainer>
          <DatePicker
            date={state.pub_date}
            onDateChange={(date) => {
              handleChange("pub_date", date);
            }}
          />
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography>{JSON.stringify(state.pub_date)}</Typography>
        </EditColumnContainer>
      </ContentContainer>
    </EditorContainer>
  );
};
