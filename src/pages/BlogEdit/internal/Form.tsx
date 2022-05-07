import {
  Button,
  DatePicker,
  Flex,
  Input,
  ToggleButton,
  Typography,
} from "ingred-ui";
import { marked } from "marked";
import moment from "moment";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { useForm } from "./hooks/useForm";
import { markdownStyle } from "./markdownRenderer";
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
}: {
  id: number;
  title: string;
  contents: string;
  open: boolean;
  pub_date: Date;
}) => {
  const { handleChange, state } = useForm({
    id: Number(id),
    title,
    contents,
    open,
    pub_date: moment(pub_date),
  });

  const getHight = (value: string) => {
    return `${value.split(" ").length}px`;
  };

  return (
    <EditorContainer>
      <ContentContainer display="flex" style={{ alignItems: "center" }}>
        <EditColumnContainer>{/* Empty */}</EditColumnContainer>
        <EditColumnContainer>
          <Flex style={{ width: "150px", margin: "0 0 0 auto" }}>
            <Button>{state.open ? "保存" : "下書き保存"}</Button>
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
              console.log(date);
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
