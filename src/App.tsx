import { ChakraProvider, extendTheme, Flex, Box } from "@chakra-ui/react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnalyticsForm } from './Form';
import { Result } from './Result';
import { Detail } from './Detail';
import { H1 } from './components';

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
      <H1 text={'takurinton analytics'}></H1>
      <Router>
        <Route exact path='/'>
          <Flex margin={'0 auto'} width={'90vw'}>
          <AnalyticsForm />
          <Result />
        </Flex>
        </Route>
        <Route exact path='/detail'>
          <Detail />
        </Route>
      </Router>
    </ChakraProvider>
  );
}
