import { ChakraProvider, extendTheme, Flex, Box } from "@chakra-ui/react";
import { AnalyticsForm } from './Form';
import { Result } from './Result';

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign={'center'} margin={'50px 0'}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>takurinton analytics</h1>
      </Box>
      <Flex margin={'0 auto'} width={'90vw'}>
        <AnalyticsForm />
        <Result />
      </Flex>
    </ChakraProvider>
  );
}
