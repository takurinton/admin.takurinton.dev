import { ASTNode } from "graphql";
import { useForm } from "../hooks/useForm";
import { useTransformerContext } from "../context/context";
import {
  DateRangePicker,
  Flex,
  OptionType,
  Select,
  Typography,
} from "ingred-ui";
import "./_datepicker.css";
import moment from "moment";
import { useState } from "react";

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
    // custom hooks で管理したいけど、moment 形式ではないので別で管理する
    const [startDate, setStartDate] = useState(moment().set("date", 1));
    const [endDate, setEndDate] = useState(moment());

    const onChange = (name: string, newValue: string | undefined): void => {
      handleChange(name, newValue);
      onUpdateAST(name, newValue ?? "");
    };

    const onUpdateAST = (name: string, newValue: string) => {
      api.updateNode(name, newValue);
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

    const handleChangeDates = ({
      startDate,
      endDate,
    }: {
      startDate: moment.Moment;
      endDate: moment.Moment;
    }) => {
      setStartDate(startDate);
      setEndDate(endDate);
      const start = startDate
        ? `${startDate.format("YYYY")}-${startDate.format(
            "MM"
          )}-${startDate.format("DD")}`
        : undefined;
      const end = endDate
        ? `${endDate.format("YYYY")}-${endDate.format("MM")}-${endDate.format(
            "DD"
          )}`
        : undefined;
      onChange("start", start);
      onChange("end", end);
    };

    return (
      <Flex>
        <Typography>data</Typography>
        <form>
          <Typography>domain</Typography>
          <Select
            name={"domain"}
            options={domainOptions}
            onChange={(newValue) => {
              // なぜか型安全にならない
              // @ts-ignore
              onChange("domain", newValue.value);
            }}
          />

          <Typography>path</Typography>
          <Select
            name={"path"}
            placeholder={"pathを入力してください"}
            options={getPathOptions()}
            onChange={(newValue) => {
              // なぜか型安全にならない
              // @ts-ignore
              onChange("path", newValue.value);
            }}
          />

          <Typography>date</Typography>
          <div style={{ height: "400px" }}>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDatesChange={handleChangeDates}
            />
          </div>
        </form>
      </Flex>
    );
  }

  return <Flex>error</Flex>;
};
