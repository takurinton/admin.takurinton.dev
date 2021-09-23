import { ChakraProvider } from "@chakra-ui/react";
import { Form } from './Form';

export const App = () => {
  return (
    <ChakraProvider>
      <Form />
    </ChakraProvider>
  );
}
