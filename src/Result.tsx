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
import { H2 } from './components';

export const Result = ({ result }: { result: any }) => {
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
              result.data.analytics.analytics.map((a: { id: number, domain: string, path: string, created_at: string}) => (
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
          <h1>count: {result.data.analytics.count}</h1>
      </Table>
    </Box>
  );
}