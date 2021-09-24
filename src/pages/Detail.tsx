import { useState } from "react";
import { Bar } from 'react-chartjs-2';
import { useQuery } from "urql";
import { 
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption, } from "@chakra-ui/react";
// import { Result } from "../components/Result";
import { ACenter } from '../components/text';
import { H1 } from '../components/H1';
import { H2 } from '../components/H2';
import { PORTFOLIO, BLOG, PORTFOLIO_NUMBER, BLOG_NUMBER, ALL_NUMBER } from '../utils/constants';

const getParam = (name: string) => {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const res = regex.exec(url);
  if (!res) return null;
  if (!res[2]) return '';
  return decodeURIComponent(res[2].replace(/\+/g, " "));
}

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
  const domainString = getParam('domain');
  const domain = domainString === PORTFOLIO ?
  PORTFOLIO_NUMBER: domainString === BLOG ? 
  BLOG_NUMBER: ALL_NUMBER;
  const path = getParam('path') ?? '';
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
      <ACenter href={`https://${domainString}${path}`} text={`https://${domainString}${path}`}></ACenter>
      <Box width={'100%'} padding={'10px 10px 10px 30px'}>
      <Bar data={data} />
    </Box>
    </Box>
  );
}