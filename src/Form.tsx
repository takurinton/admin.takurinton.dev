import React from "react";
import { Box, FormControl, Select, FormLabel, Input } from "@chakra-ui/react"
import { useForm } from './useForm';
import { H2 } from './components';
import mock from '../mock.json';

export const AnalyticsForm = () => {
  return (
    <Form />
  )
};

const Form = () => {
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
            mock.data.analytics.path_list.map(path => {
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