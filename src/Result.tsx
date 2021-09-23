import { Link } from "react-router-dom";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import mock from '../mock.json';
import { H2 } from './components';

export const Result = () => {
  const { data } = mock;
  return (
    <Box width={'100%'} padding={'10px 10px 10px 30px'}>
        <H2 text={'result'}></H2>
      <Table variant="simple">
        <TableCaption>takurinton analytics</TableCaption>
          <Thead>
            <Tr>
              <Th>domain</Th>
              <Th>path</Th>
              <Th>created_at</Th>
              <Th>detail</Th>
            </Tr>
          </Thead>
          <Tbody>
            {
              data.analytics.analytics.map(a => (
                <Tr key={a.id}>
                  <Td>{a.domain}</Td>
                  <Td>{a.path}</Td>
                  <Td>{a.created_at}</Td>
                  <Td><Link to={`/detail/?domain=${a.domain}&path=${a.path}`}>detail</Link></Td>
                </Tr>
              ))
            }
            <Tr>
              <Td>...</Td>
              <Td>...</Td>
              <Td>...</Td>
            </Tr>
          </Tbody>
          <h1>count: {data.analytics.count}</h1>
      </Table>
    </Box>
  );
}