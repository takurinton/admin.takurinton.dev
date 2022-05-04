import { useState } from "react";
import { useQuery } from "urql";
import { DocumentNode, parse, print } from "graphql";
import { Result } from "../components/Result";
import { Form } from "../components/Form";
import { Paginator } from "../components/Paginator";
import { TransformerContextProvider } from "../context/context";
import { getParams } from "../utils/getParams";
import { Flex, Typography } from "ingred-ui";
import styled from "styled-components";

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
  const page = getParams("page") ?? 1;
  const [query, setQuery] = useState(initialQuery);
  const [ast, setAst] = useState<DocumentNode>(parse(initialQuery));

  const [result] = useQuery({
    query: query,
  });

  // 最初だけローディング表示する、2回目以降は form がリセットされてしまうのでやらない
  if (query === initialQuery) {
    return result.fetching ? (
      <Typography>loading...</Typography>
    ) : (
      <TransformerContextProvider
        root={ast}
        onChangeNode={(ast) => {
          setAst(ast);
          setQuery(print(ast));
          console.log(print(ast));
        }}
      >
        <Flex display="flex">
          <Container>
            <Form result={result} node={ast} />
          </Container>
          <Container>
            <Result result={result} ast={ast} />
            <Paginator result={result} />
          </Container>
        </Flex>
      </TransformerContextProvider>
    );
  }

  return (
    <>
      <TransformerContextProvider
        root={ast}
        onChangeNode={(ast) => {
          setAst(ast);
          setQuery(print(ast));
          console.log(print(ast));
        }}
      >
        <Flex display="flex">
          <Form result={result} node={ast} />
          <Flex>
            <Result result={result} ast={ast} />
            <Paginator result={result} />
          </Flex>
        </Flex>
      </TransformerContextProvider>
    </>
  );
};

const Container = styled.div`
  margin: 0 2%;
  width: 46%;
`;
