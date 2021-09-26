import { Box, Flex, Button, Text } from "@chakra-ui/react";
import { useTransformerContext } from "../context/context";

export const Paginator = ({ result }: { result: any }) => {
  const api = useTransformerContext();
  const pages = result.data.analytics.pages;

  const onClick = (page: number) => {
    const _node = api.getCurrentNode();
    _node.definitions.map(v => {
      if (v.kind === 'OperationDefinition') {
        v.selectionSet.selections.map(vv => {
          // @ts-ignore
          vv.arguments.map(vvv => {
            if (vvv.name.value === 'page') {
              vvv.value.value = page;
              api.updateNode(_node);
              window.scrollTo(0, 0);
            }
          });
        });
      }
    });
  };

  return (
    <Flex margin={'50px auto'} width={'100%'} padding={'10px 10px 10px 30px'} position={'relative'}>
      {
        pages.prev !== 0 ? 
        <Button width={'20%'} height={'50px'} onClick={() => onClick(pages.prev)}>preview</Button> :
        <Box width={'20%'}></Box>
      }
      <Text fontSize="xl" fontWeight={700} textAlign={'center'} lineHeight={'50px'} height={'50px'} width={'60%'}>{pages.current}</Text>
      {
        pages.current !== pages.page_count ? 
          <Button width={'20%'} height={'50px'} onClick={() => onClick(pages.next)}>next</Button> : 
          <Box width={'20%'}></Box>
      }
    </Flex>
  );
}