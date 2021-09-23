import { Box, FormControl, Select } from "@chakra-ui/react"

export const Form = () => {
  return (
    <Box>
      <FormControl>
        <Select>
          <option value={'v1'}>v1</option>
          <option value={'v2'}>v2</option>
          <option value={'v3'}>v3</option>
        </Select>
      </FormControl>
    </Box>
  );
}