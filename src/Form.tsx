import { Box, FormControl, Select, FormLabel, Input } from "@chakra-ui/react"

export const Form = () => {
  return (
    <Box width={'40vw'} padding={'10px'}>
      <Box textAlign={'center'} marginBottom={'20px'}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 700 }}>filter</h1>
      </Box>
      <FormControl>
        <FormLabel>domain</FormLabel>
        <Select>
        <option value={undefined}>all</option>
          <option value={1}>takurinton.com</option>
          <option value={2}>blog.takurinton.com</option>
        </Select>

        <FormLabel>path</FormLabel>
        <Input type="text" value={undefined} placeholder={'pathを入力してください'} />

        <FormLabel>start</FormLabel>
        <Select>
          <option value={undefined}>all</option>
        </Select>

        <FormLabel>end</FormLabel>
        <Select>
          <option value={undefined}>all</option>
        </Select>
      </FormControl>
    </Box>
  );
}