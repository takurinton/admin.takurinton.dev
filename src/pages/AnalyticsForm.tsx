import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { DocumentNode, parse, print } from "graphql";
import { Result } from "../components/Result";
import { Form } from "../components/Form";
import { TransformerContextProvider } from "../context/context";
import { Button, Flex, Spinner, Typography } from "ingred-ui";
import styled from "styled-components";
import { Toast } from "ingred-ui";

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
  const [query, setQuery] = useState(initialQuery);
  const [ast, setAst] = useState<DocumentNode>(parse(initialQuery));

  const [result] = useQuery({
    query: query,
  });

  if (result.error) {
    return (
      <div style={{ width: "200px" }}>
        <Button onClick={() => console.log("TODO: login button")}>
          ログインし直す
        </Button>
      </div>
    );
  }

  // 最初だけローディング表示する、2回目以降は form がリセットされてしまうのでやらない
  if (query === initialQuery) {
    return result.fetching ? (
      <Flex style={{ width: "fit-content", margin: "auto", padding: "40px" }}>
        <Spinner />
      </Flex>
    ) : (
      <TransformerContextProvider
        root={ast}
        onChangeNode={(ast) => {
          setAst(ast);
          setQuery(print(ast));
        }}
      >
        <Flex display="flex">
          <FormContainer>
            <Form result={result} node={ast} />
          </FormContainer>
          <TableContainer>
            <Result result={result} ast={ast} />
          </TableContainer>
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
        }}
      >
        <Flex display="flex">
          <FormContainer>
            <Form result={result} node={ast} />
          </FormContainer>
          <TableContainer>
            <Result result={result} ast={ast} />
          </TableContainer>
        </Flex>
      </TransformerContextProvider>
    </>
  );
};

const FormContainer = styled.div`
  margin: 0 1%;
  width: 38%;
`;

const TableContainer = styled.div`
  margin: 0 1%;
  width: 58%;
`;
