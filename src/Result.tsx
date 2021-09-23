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

export const Result = () => {
  const { data } = mock;
  return (
    <Box width={'100%'} padding={'10px 10px 10px 30px'}>
      <Box textAlign={'center'} marginBottom={'20px'}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>result</h1>
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
              data.analytics.analytics.map(a => (
                <Tr key={a.id}>
                  <Td>{a.domain}</Td>
                  <Td>{a.path}</Td>
                  <Td>{new Date(Number(a.created_at)).toString()}</Td>
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