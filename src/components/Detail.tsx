import { Bar } from 'react-chartjs-2';
import { Box, Select, FormLabel } from "@chakra-ui/react";
import { DocumentNode } from "graphql";
import { ACenter } from '../components/text';
import { H1 } from '../components/H1';
import { useTransformerContext } from "../context/context";
import { useForm } from "../hooks/useForm";
import { getDateList } from "../utils/getDateList";

type Data = {
  count: number;
  date: string;
}[];

const getDate = (date_count: Data) => date_count.map(d => d.date);
const getCount = (date_count: Data) => date_count.map(d => d.count);

export const Detail = ({ 
  ast, 
  result, 
  domainString, 
  path 
}: { 
  ast?: DocumentNode, 
  result: any, 
  domainString: string | null, 
  path: string 
}) => {
  const {
    handleChange, 
    state
  } = useForm();

  const api = useTransformerContext();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleChange(e);
    onUpdateAST(e);
  };
  
  const onUpdateAST = (event: React.ChangeEvent<HTMLSelectElement>) => {
    api.updateNode(event.target.name, event.target.value);
  }

  const data = {
    labels: getDate(result.data.analytics_by_path_for_blog.date_count),
    datasets: [
      {
        backgroundColor: '#ff7f7f',
         borderColor: '#ff7f7f',
        data: getCount(result.data.analytics_by_path_for_blog.date_count),
        label: '閲覧数',
      },
    ],
  };

  const dateList = getDateList();

  return (
    <Box>
      <H1 text={`総閲覧数: ${result.data.analytics_by_path_for_blog.count}`}></H1>
      <ACenter href={`https://${domainString}${path}`} text={`https://${domainString}${path}`}></ACenter>
      <Box margin={'0 auto'} width={'60vw'}>
        <FormLabel>start</FormLabel>
        <Select name={'start'} onChange={onChange}>
          <option value={''}>all</option>
          {
            dateList.map(d => <option key={d} value={d}>{d}</option>)
          }
        </Select>
      
        <FormLabel>end</FormLabel>
        <Select name={'end'} onChange={onChange}>
          <option value={''}>all</option>
          {
            dateList.map(d => <option key={d} value={d}>{d}</option>)
          }
        </Select>
      </Box>
      <Box width={'100%'} padding={'10px 10px 10px 30px'}>
      <Bar data={data} />
    </Box>
    </Box>
  );
}