import React from "react";
import { useQuery } from 'urql';
import { Box, FormControl, Select, FormLabel, Input } from "@chakra-ui/react"
import { useForm } from './useForm';
import { H1, H2 } from './components';
import { Result } from "./Result";
import { Analytics, AnalyticsType } from './types';

const initialQuery = `
query getAnalytics {
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
}`;

export const AnalyticsForm = () => {
  const [result] = useQuery({
    query: initialQuery,
  });

  if (result.fetching) return <H1 text={'Loading...'}></H1>;
  if (result.error) return <div>{result.error.message}</div>;

  return (
    <>
      <Form result={result} />
      <Result result={result} />
    </>
  )
};

const Form = ({ result }: { result: any }) => {
  const {
    handleChange, 
    state
  } = useForm();

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleChange(e);
  };

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
            result.data.analytics.path_list.map((path: { path: string }) => {
              return <option value={path.path} >{path.path}</option>
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
}