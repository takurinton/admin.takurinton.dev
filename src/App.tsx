import { Provider, createClient } from "urql";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AnalyticsForm } from "./pages/AnalyticsForm";
import { DetailForm } from "./pages/Detail";
import { createTheme, Flex, ThemeProvider, Typography } from "ingred-ui";

const url = "https://api-takurinton-dev.onrender.com/graphql";
const client = createClient({
  url,
});

export const App = () => {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        <Typography>takurinton analytics</Typography>
        <Router>
          <Route exact path="/">
            <Flex>
              <AnalyticsForm />
            </Flex>
          </Route>
          <Route exact path="/detail">
            <DetailForm />
          </Route>
        </Router>
      </Provider>
    </ThemeProvider>
  );
};
