import { Box, Button, Text } from "@chakra-ui/react";
import React from "react";
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
    <Box margin={'50px auto'} width={'100%'} padding={'10px 10px 10px 30px'} position={'relative'}>
      {
        pages.prev !== 0 ? 
        <Button position={'absolute'} onClick={() => onClick(pages.prev)}>prev</Button> :
        <></>
      }
      <Text fontSize="md" position={'absolute'} right={0} left={0} margin={'auto'} textAlign={'center'}>{pages.current}</Text>
      {
        pages.current !== pages.page_count ? 
          <Button position={'absolute'} right={0} onClick={() => onClick(pages.next)}>next</Button> : 
          <></>
      }
    </Box>
  );
}