import React, { useEffect, useState } from "react";
import { useQuery } from 'urql';
import { ASTNode, DocumentNode, parse, print } from "graphql";
import { Box, FormControl, Select, FormLabel, Input } from "@chakra-ui/react"
import { useForm } from './useForm';
import { H1, H2 } from './components';
import { Result } from "./Result";
import { TransformerContextProvider, useTransformerContext } from './context';

const q = `
analytics {
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
`

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

const Form = ({ result, node }: { result?: any, node: ASTNode }) => {
  const pathList = result.data.analytics.path_list;

  if (node.kind === 'Document') {
    return (
      <Box>
        {node.definitions.map((def, index) => {
          return <Form key={index} node={def} result={result} />;
        })}
      </Box>
    );
  }

  if (node.kind === 'OperationDefinition') {
    return (
      <Box border="1px solid white" boxSizing="border-box">
        <Form node={node.selectionSet} result={result} />
      </Box>
    );
  }

  if (node.kind === 'SelectionSet') {
    return (
      <Box>
        {node.selections.map((def, index) => {
          return <Form key={index} node={def} result={result} />;
        })}
      </Box>
    )
  }

  if (node.kind === 'Field') {
    const api = useTransformerContext();
    const {
      handleChange, 
      state
    } = useForm();

    const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      handleChange(e);
      onUpdateAST(e);
    };

    const onUpdateAST = (event) => {
      const _node = api.getCurrentNode();
      _node.definitions.map(v => {
        if (v.kind === 'OperationDefinition') {
          v.selectionSet.selections.map(vv => {
            // @ts-ignore
            vv.arguments.map(vvv => {
              if (vvv.name.value === event.target.name) {
                vvv.value.value = event.target.value;
                api.updateNode(_node);
              };
            });
          });
        }
      });
    }
  
    return (
      <Box width={'40vw'} padding={'10px'}>
        <H2 text={'data'}></H2>
        <FormControl>
          <FormLabel>domain</FormLabel>
          <Select name={'domain'} onChange={onChange}>
            <option value={'undefined'}>all</option>
            <option value={1}>takurinton.com</option>
            <option value={2}>blog.takurinton.com</option>
          </Select>
  
          <FormLabel>path</FormLabel>
          <Select name={'path'} onChange={onChange} placeholder={'pathを入力してください'}>
            {
              state.domain === '1' ? <option value={'/'} >{'/'}</option> : 
              pathList.map((path: { path: string }) => {
                return <option key={path.path} value={path.path} >{path.path}</option>
              })
            }
          </Select>
  
          <FormLabel>start</FormLabel>
          <Select name={'start'} onChange={onChange}>
            <option value={undefined}>all</option>
          </Select>
  
          <FormLabel>end</FormLabel>
          <Select name={'start'} onChange={onChange}>
            <option value={undefined}>all</option>
          </Select>
        </FormControl>
      </Box>
    );
  };

  return <Box>hoge</Box>
}