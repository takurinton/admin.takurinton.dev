import { ASTNode } from "graphql";
import { useForm } from "../hooks/useForm";
import { useTransformerContext } from "../context/context";
import { getDateList } from "../utils/getDateList";
import { Flex, Select, Typography } from "ingred-ui";

export const Form = ({ result, node }: { result?: any; node: ASTNode }) => {
  const pathList = result.data.analytics.path_list;

  if (node.kind === "Document") {
    return (
      <Flex>
        {node.definitions.map((def, index) => {
          return <Form key={index} node={def} result={result} />;
        })}
      </Flex>
    );
  }

  if (node.kind === "OperationDefinition") {
    return (
      <Flex>
        <Form
          key={"operation_definition"}
          node={node.selectionSet}
          result={result}
        />
      </Flex>
    );
  }

  if (node.kind === "SelectionSet") {
    return (
      <Flex>
        {node.selections.map((def, index) => {
          return <Form key={index} node={def} result={result} />;
        })}
      </Flex>
    );
  }

  if (node.kind === "Field") {
    const api = useTransformerContext();
    const { handleChange, state } = useForm();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      handleChange(e);
      onUpdateAST(e);
    };

    const onUpdateAST = (event: React.ChangeEvent<HTMLSelectElement>) => {
      api.updateNode(event.target.name, event.target.value);
    };

    const domainOptions = [
      { label: "takurinton.com", value: 1 },
      { label: "blog.takurinton.com", value: 2 },
      { label: "takurinton.dev", value: 7 },
      { label: "blog.takurinton.dev", value: 8 },
    ];

    const getPathOptions = () => {
      if (state.domain === "1") return [{ label: "/", value: "/" }];
      return pathList.map(({ path }: { path: string }) => ({
        label: path,
        value: path,
      }));
    };

    return (
      <Flex>
        <Typography>data</Typography>
        <form>
          <Typography>domain</Typography>
          <Select name={"domain"} options={domainOptions} />

          <Typography>path</Typography>
          <Select
            name={"path"}
            placeholder={"pathを入力してください"}
            options={getPathOptions()}
          />

          <Typography>start</Typography>
          <Select
            options={getDateList().map((date) => ({
              label: date,
              value: date,
            }))}
          />

          <Typography>end</Typography>
          <Select
            options={getDateList().map((date) => ({
              label: date,
              value: date,
            }))}
          />
        </form>
      </Flex>
    );
  }

  return <Flex>error</Flex>;
};
