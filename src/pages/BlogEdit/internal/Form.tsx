import { Flex, Input, TextField, ToggleButton, Typography } from "ingred-ui";
import { ChangeEvent, createRef, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "./hooks/useForm";

const EditorContainer = styled.div``;

const EditColumnContainer = styled.div`
  margin: 0% 2% 0;
  width: 46%;
`;

const TextAreaStyle = styled.div`
  &:focus {
    border: red;
  }
`;

const TextArea = ({
  contents,
  onChange,
}: {
  contents: string;
  onChange: (name: string, newValue: string) => void;
}) => {
  const ref = createRef<HTMLDivElement>();

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "a") {
      document.execCommand("delete");
    }
  };

  return (
    <TextAreaStyle ref={ref} contentEditable onKeyDown={handleKeydown}>
      {contents}
    </TextAreaStyle>
  );
};

export const BlogEditForm = ({
  id,
  title,
  contents,
  open,
  pub_date,
}: {
  id: number;
  title: string;
  contents: string;
  open: boolean;
  pub_date: string;
}) => {
  const { handleChange, state } = useForm({
    id,
    title,
    contents,
    pub_date,
    open,
  });

  const getHight = (value: string) => {
    return value.split("\n").length;
  };

  return (
    <EditorContainer>
      <Flex display="flex">
        <EditColumnContainer>
          <Input
            value={state.title}
            name="title"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChange("title", target.value);
            }}
          />
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography>{state.title}</Typography>
        </EditColumnContainer>
      </Flex>
      <Flex display="flex">
        <EditColumnContainer>
          <TextArea contents={state.contents} onChange={handleChange} />
          {/* <Input
            multiline
            value={state.contents}
            name="contents"
            height={getHight(state.contents)}
            onChange={({ target }: ChangeEvent<HTMLInputElement>) => {
              handleChange("contents", target.value);
            }}
          ></Input> */}
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography>{state.contents}</Typography>
        </EditColumnContainer>
      </Flex>
      <Flex display="flex">
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
      </Flex>
      <Typography>{JSON.stringify(pub_date)}</Typography>
    </EditorContainer>
  );
};
