import { useState } from "react";
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
  const [query, setQuery] = useState<string>(initialQuery(domain, path))

  const [result] = useQuery({
    query: query,
  });

  if (result.fetching) return <H1 text={'loading...'}></H1>
  return (
    <Box>
      <ACenter href={`https://${domainString}${path}`} text={`https://${domainString}${path}`}></ACenter>
      <Box width={'100%'} padding={'10px 10px 10px 30px'}>
      <H2 text={'result'}></H2>
      <Box textAlign={'right'} marginRight={'30px'} marginBottom={'10px'}>
        count: {result.data.analytics_by_path_for_blog.count}
      </Box>
      <Table variant="simple">
        <TableCaption>takurinton analytics</TableCaption>
          <Thead>
            <Tr>
              <Th>domain</Th>
              <Th>path</Th>
              <Th>created_at</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              result.data.analytics_by_path_for_blog.analytics.map((a: { id: number, domain: string, path: string, created_at: string}) => (
                <Tr key={a.id}>
                  <Td>{a.domain}</Td>
                  <Td>{a.path}</Td>
                  <Td>{a.created_at}</Td>
                </Tr>
              ))
            }
            <Tr>
              <Td>...</Td>
              <Td>...</Td>
              <Td>...</Td>
            </Tr>
          </Tbody>
      </Table>
    </Box>
    </Box>
  );
}