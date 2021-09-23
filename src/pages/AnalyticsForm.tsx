import React, { useState } from "react";
import { useQuery } from 'urql';
import { DocumentNode, parse, print } from "graphql";
import { H1 } from '../components/text';
import { Result } from "../components/Result";
import { Form } from '../components/Form';
import { TransformerContextProvider } from '../context/context';

const initialQuery = `
query getAnalytics {
  analytics(domain: 0, path: "") {
    count
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
      <Form result={result} node={ast} />
      <Result result={result} ast={ast} />
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
        <Form result={result} node={ast} />
        <Result result={result} ast={ast} />
      </TransformerContextProvider>
    </>
  )
};
