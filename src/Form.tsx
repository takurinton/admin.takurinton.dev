import React from "react";
import { Box, FormControl, Select, FormLabel, Input } from "@chakra-ui/react"
import { useForm } from './useForm';

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
      <Box textAlign={'center'} marginBottom={'20px'}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>filter</h1>
      </Box>
      <FormControl>
        <FormLabel>domain</FormLabel>
        <Select name={'domain'} onChange={onChange}>
          <option value={'undefined'}>all</option>
          <option value={1}>takurinton.com</option>
          <option value={2}>blog.takurinton.com</option>
        </Select>

        <FormLabel>path</FormLabel>
        <Input type="text" name={'path'} value={state.path} onChange={onChange} placeholder={'pathを入力してください'} />

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