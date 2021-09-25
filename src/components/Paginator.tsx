import { Box, Button, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Paginator = ({ result }: { result: any }) => {
  const pages = result.data.analytics.pages;

  return (
    <Box margin={'50px auto'} width={'100%'} padding={'10px 10px 10px 30px'} position={'relative'}>
      {
        pages.prev !== 0 ? 
        <Button position={'absolute'}>prev</Button> :
        <></>
      }
      <Text fontSize="md" position={'absolute'} right={0} left={0} margin={'auto'} textAlign={'center'}>{pages.current}</Text>
      {
        pages.current !== pages.page_count ? 
          <Button position={'absolute'} right={0}><Link to={`/?page=${pages.next}`}>next</Link></Button> : 
          <></>
      }
    </Box>
  );
}