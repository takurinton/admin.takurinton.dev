import { Flex, Input, TextField, ToggleButton, Typography } from "ingred-ui";
import styled from "styled-components";
import { useForm } from "./hooks/useForm";

const EditorContainer = styled.div``;

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
}: {
  id: number;
  title: string;
  contents: string;
  open: boolean;
  pub_date: string;
}) => {
  const { handleChange, state, setState } = useForm({
    id,
    title,
    contents,
    pub_date,
    open,
  });

  return (
    <EditorContainer>
      <Flex display="flex">
        <EditColumnContainer>
          <Input value={state.title} name="title" onChange={handleChange} />
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography>{state.title}</Typography>
        </EditColumnContainer>
      </Flex>
      <Flex display="flex">
        <EditColumnContainer>
          <TextField
            value={state.contents}
            height="30vh"
            onChange={handleChange}
          ></TextField>
        </EditColumnContainer>
        <EditColumnContainer>
          <Typography>{state.contents}</Typography>
        </EditColumnContainer>
      </Flex>
      <Flex display="flex">
        <EditColumnContainer>
          <ToggleButton
            active={state.open}
            onChange={() =>
              setState((state: any) => ({ ...state, open: !open }))
            }
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
