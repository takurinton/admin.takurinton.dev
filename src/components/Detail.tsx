import { Bar } from "react-chartjs-2";
import { DocumentNode } from "graphql";
import { ACenter } from "../components/text";
import { useTransformerContext } from "../context/context";
import { useForm } from "../hooks/useForm";
import { getDateList } from "../utils/getDateList";
import { Flex, Select, Typography } from "ingred-ui";

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

  const api = useTransformerContext();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleChange(e);
    onUpdateAST(e);
  };

  const onUpdateAST = (event: React.ChangeEvent<HTMLSelectElement>) => {
    api.updateNode(event.target.name, event.target.value);
  };

  const data = {
    labels: getDate(result.data.analytics_by_path_for_blog.date_count),
    datasets: [
      {
        backgroundColor: "#ff7f7f",
        borderColor: "#ff7f7f",
        data: getCount(result.data.analytics_by_path_for_blog.date_count),
        label: "閲覧数",
      },
    ],
  };

  const dateList = getDateList();

  const options = dateList.map((d) => ({ label: d, value: d }));

  return (
    <Flex>
      <Typography>{`総閲覧数: ${result.data.analytics_by_path_for_blog.count}`}</Typography>
      <ACenter
        href={`https://${domainString}${path}`}
        text={`https://${domainString}${path}`}
      ></ACenter>
      <Flex>
        <Typography>start</Typography>
        <Select isMulti={true} options={options} />
        <Typography>end</Typography>
        <Select options={options} />
      </Flex>
      <Flex>
        <Bar data={data} />
      </Flex>
    </Flex>
  );
};
