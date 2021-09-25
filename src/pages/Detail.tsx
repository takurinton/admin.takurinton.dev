import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { useQuery } from "urql";
import { Box } from "@chakra-ui/react";
import { ACenter } from '../components/text';
import { H1 } from '../components/H1';
import { PORTFOLIO, BLOG, PORTFOLIO_NUMBER, BLOG_NUMBER, ALL_NUMBER } from '../utils/constants';
import { getParams } from '../utils/getParams';

type Data = {
  count: number;
  date: string;
}[];

const getDate = (date_count: Data) => date_count.map(d => d.date);
const getCount = (date_count: Data) => date_count.map(d => d.count);

const initialQuery = (domain: number, path: string) => `
{
  analytics_by_path_for_blog(domain: ${domain}, path: "${path}") {
    count
    analytics {
      id 
      domain 
      path 
      created_at
    }
    date_count {
      date 
      count
    }
  }
}
`

export const Detail = () => {
  const domainString = getParams('domain');
  const domain = domainString === PORTFOLIO ?
  PORTFOLIO_NUMBER: domainString === BLOG ? 
  BLOG_NUMBER: ALL_NUMBER;
  const path = getParams('path') ?? '';
  const [query, setQuery] = useState<string>(initialQuery(domain, path));
  // const [data, setData] = useState<any>({})

  const [result] = useQuery({
    query: query,
  });

  if (result.fetching) return <H1 text={'loading...'}></H1>;

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

  return (
    <Box>
      <H1 text={`総閲覧数: ${result.data.analytics_by_path_for_blog.count}`}></H1>
      <ACenter href={`https://${domainString}${path}`} text={`https://${domainString}${path}`}></ACenter>
      <Box width={'100%'} padding={'10px 10px 10px 30px'}>
      <Bar data={data} />
    </Box>
    </Box>
  );
}