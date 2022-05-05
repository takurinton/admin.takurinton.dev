import { Line } from "react-chartjs-2";
import { DocumentNode } from "graphql";
import { ACenter } from "../components/text";
import { useTransformerContext } from "../context/context";
import { useForm } from "../hooks/useForm";
import { DateRangePicker, Flex, Select, Typography } from "ingred-ui";
import { useState } from "react";
import moment from "moment";

type Data = {
  count: number;
  date: string;
}[];

const getDate = (date_count: Data) => date_count.map((d) => d.date);
const getCount = (date_count: Data) => date_count.map((d) => d.count);

export const Detail = ({
  ast,
  result,
  domainString,
  path,
}: {
  ast?: DocumentNode;
  result: any;
  domainString: string | null;
  path: string;
}) => {
  const { handleChange, state } = useForm();
  const [startDate, setStartDate] = useState(moment("2021-08-27"));
  const [endDate, setEndDate] = useState(moment());

  const api = useTransformerContext();

  const onChange = (name: string, newValue: string | undefined): void => {
    handleChange(name, newValue);
    onUpdateAST(name, newValue ?? "");
  };

  const onUpdateAST = (name: string, newValue: string) => {
    api.updateNode(name, newValue);
  };

  const data = {
    labels: getDate(result.data.analytics_by_path_for_blog.date_count),
    datasets: [
      {
        backgroundColor: "#ff69b4",
        borderColor: "#ff69b4",
        data: getCount(result.data.analytics_by_path_for_blog.date_count),
        label: "閲覧数",
      },
    ],
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
      <Typography>{`総閲覧数: ${result.data.analytics_by_path_for_blog.count}`}</Typography>
      <ACenter
        href={`https://${domainString}${path}`}
        text={`https://${domainString}${path}`}
      ></ACenter>
      <Flex>
        <Typography>日付</Typography>
        <div style={{ width: "100%" }}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDatesChange={handleChangeDates}
          />
        </div>
      </Flex>
      <Flex>
        <Typography>グラフ</Typography>
        <Line data={data} />
      </Flex>
    </Flex>
  );
};
