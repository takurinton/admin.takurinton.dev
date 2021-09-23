import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Provider, createClient } from 'urql';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AnalyticsForm } from './pages/AnalyticsForm';
import { Detail } from './pages/Detail';
import { H1 } from './components/text';

const client = createClient({
  url: 'http://localhost:3001/prismaserver/graphql',
});

export const App = () => {
  return (
    <ChakraProvider>
      <Provider value={client}>
        <H1 text={'takurinton analytics'}></H1>
        <Router>
          <Route exact path='/'>
            <Flex margin={'0 auto'} width={'90vw'}>
            <AnalyticsForm />
          </Flex>
          </Route>
          <Route exact path='/detail'>
            <Detail />
          </Route>
        </Router>
      </Provider>
    </ChakraProvider>
  );
}
