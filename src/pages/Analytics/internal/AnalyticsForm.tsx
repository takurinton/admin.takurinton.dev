import { ASTNode } from "graphql";
import { useForm } from "../../../hooks/useForm";
import { useTransformerContext } from "../../../context/context";
import { DateRangePicker, Flex, Select, Table } from "ingred-ui";
import "../../../style/_datepicker.css";
import moment from "moment";
import { useState } from "react";

export const AnalyticsForm = ({
  result,
  node,
}: {
  result?: any;
  node: ASTNode;
}) => {
  const pathList = result.data.analytics.path_list;

  if (node.kind === "Document") {
    return (
      <Flex>
        {node.definitions.map((def, index) => {
          return <AnalyticsForm key={index} node={def} result={result} />;
        })}
      </Flex>
    );
  }

  if (node.kind === "OperationDefinition") {
    return (
      <Flex>
        <AnalyticsForm
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
          return <AnalyticsForm key={index} node={def} result={result} />;
        })}
      </Flex>
    );
  }

  if (node.kind === "Field") {
    const api = useTransformerContext();
    const { handleChange, state } = useForm();
    const [startDate, setStartDate] = useState<moment.Moment | null>(
      moment("2021-08-27")
    );
    const [endDate, setEndDate] = useState<moment.Moment | null>(moment());

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
      startDate: moment.Moment | null;
      endDate: moment.Moment | null;
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
      <Flex style={{ paddingTop: "50px" }}>
        <Table>
          <Table.Body>
            <Table.Row>
              <Table.HeaderCell width="100px">domain</Table.HeaderCell>
              <Table.Cell>
                <Select
                  name={"domain"}
                  options={domainOptions}
                  onChange={(newValue) => {
                    // なぜか型安全にならない
                    // @ts-ignore
                    onChange("domain", newValue ? newValue.value : undefined);
                  }}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell width="100px">path</Table.HeaderCell>
              <Table.Cell>
                <Select
                  name={"path"}
                  placeholder={"pathを入力してください"}
                  options={getPathOptions()}
                  onChange={(newValue) => {
                    // なぜか型安全にならない
                    // @ts-ignore
                    onChange("path", newValue ? newValue.value : undefined);
                  }}
                />
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell width="100px">date</Table.HeaderCell>
              <Table.Cell>
                <DateRangePicker
                  startDate={startDate}
                  endDate={endDate}
                  onDatesChange={handleChangeDates}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Flex>
    );
  }

  return <Flex>error</Flex>;
};
