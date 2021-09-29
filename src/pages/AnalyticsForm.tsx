import { useState } from "react";
import { Box, Flex } from '@chakra-ui/react';
import { useQuery } from 'urql';
import { DocumentNode, parse, print } from "graphql";
import { H1 } from '../components/text';
import { Result } from "../components/Result";
import { Form } from '../components/Form';
import { Paginator } from '../components/Paginator';
import { TransformerContextProvider } from '../context/context';
import { getParams } from "../utils/getParams";

const initialQuery = `
query getAnalytics {
  analytics(domain: 0, path: "", page: 1, start: "", end: "") {
    count
    pages {
      next
      prev 
      page_count 
      current
    }
    analytics {
      id 
      domain 
      path
      created_at
    }
    path_list {
      domain 
      path
    }
  }
}`;

export const AnalyticsForm = () => {
  const page = getParams('page') ?? 1;
  const [query, setQuery] = useState(initialQuery)
  const [ast, setAst] = useState<DocumentNode>(parse(initialQuery));

  const [result] = useQuery({
    query: query,
  });

  // 最初だけローディング表示する、2回目以降は form がリセットされてしまうのでやらない
  if (query === initialQuery) {
    return result.fetching ? <H1 text={'loading...'}></H1>: 
    <TransformerContextProvider 
      root={ast}
      onChangeNode={ast => {
        setAst(ast);
        setQuery(print(ast));
        console.log(print(ast))
      }}
    >
      <Flex>
        <Form result={result} node={ast} />
        <Box>
          <Result result={result} ast={ast} />
          <Paginator result={result} />
        </Box>
      </Flex>
    </TransformerContextProvider>
  }

  return (
    <>
      <TransformerContextProvider 
        root={ast}
        onChangeNode={ast => {
          setAst(ast);
          setQuery(print(ast));
          console.log(print(ast))
        }}
      >
        <Flex>
          <Form result={result} node={ast} />
          <Box>
            <Result result={result} ast={ast} />
            <Paginator result={result} />
          </Box>
        </Flex>
      </TransformerContextProvider>
    </>
  )
};
