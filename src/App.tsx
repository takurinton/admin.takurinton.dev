import { Provider, createClient } from "urql";
import {
  BrowserRouter as Router,
  Link,
  Route,
  useHistory,
} from "react-router-dom";
import { AnalyticsForm } from "./pages/AnalyticsForm";
import { DetailForm } from "./pages/Detail";
import {
  createTheme,
  Flex,
  NavigationRail,
  ThemeProvider,
  Typography,
} from "ingred-ui";
import styled from "styled-components";
import { ReactNode, useEffect, useState } from "react";

const localUrl = "http://localhost:3001/graphql";
const url = "https://api-takurinton-dev.onrender.com/graphql";
const client = createClient({
  url,
});

export const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        highlight: "#F2F9FC",
        light: "#ffbae0",
        main: "#ff69b4",
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        {/* <Toast.Provider placement="top-center"> */}
        <Main>
          <Router>
            <AppNavigation>
              <AppRoute />
            </AppNavigation>
          </Router>
        </Main>
        {/* </Toast.Provider> */}
      </Provider>
    </ThemeProvider>
  );
};

const AppRoute = () => (
  <div style={{ padding: "20px 0 0 20px" }}>
    <Route exact path="/">
      <Typography component="h1" size="xxxxl">
        takurinton管理画面n
      </Typography>
    </Route>
    <Route exact path="/blog">
      <Typography component="h1" size="xxxxl">
        ブログの管理画面
      </Typography>
    </Route>
    <Route exact path="/portfolio">
      <Typography component="h1" size="xxxxl">
        ポートフォリオ管理画面
      </Typography>
    </Route>
    <Route exact path="/analytics">
      <Flex>
        <Typography component="h1" size="xxxxl">
          アナリティクス管理画面
        </Typography>
        <AnalyticsForm />
      </Flex>
    </Route>
    <Route exact path="/analytics/detail">
      <Typography component="h1" size="xxxxl">
        ポートフォリオ詳細
      </Typography>
      <DetailForm />
    </Route>
    <Route exact path="/settings">
      <Typography component="h1" size="xxxxl">
        設定画面
      </Typography>
      <br />
      <Link to="/settings/user">ユーザーの設定</Link>
    </Route>
    <Route exact path="/settings/user">
      <Typography component="h1" size="xxxxl">
        ユーザー設定
      </Typography>
    </Route>
  </div>
);

const AppNavigation = ({ children }: { children: ReactNode }) => {
  const history = useHistory();
  const [isActivePathname, setIsActivePathname] = useState(
    history.location.pathname
  );

  return (
    <NavigationRail.Container>
      <NavigationRail>
        <NavigationRail.Content>
          <NavigationRail.Menu
            title="home"
            isActive={isActivePathname === "/"}
            iconName="dashboard"
            onClick={() => {
              setIsActivePathname("/");
              history.push("/");
            }}
          />
          <NavigationRail.Menu
            title="blog"
            isActive={isActivePathname === "/blog"}
            iconName="pencil"
            onClick={() => {
              setIsActivePathname("/blog");
              history.push("/blog");
            }}
          />
          <NavigationRail.Menu
            title="portfolio"
            isActive={isActivePathname === "/portfolio"}
            iconName="profile"
            onClick={() => {
              setIsActivePathname("/portfolio");
              history.push("/portfolio");
            }}
          />
          <NavigationRail.Menu
            title="analytics"
            isActive={isActivePathname === "/analytics"}
            iconName="bar_chart"
            onClick={() => {
              setIsActivePathname("/analytics");
              history.push("/analytics");
            }}
          />
          <NavigationRail.ExpantionMenu
            title="Setting"
            isActive={isActivePathname.indexOf("/settings") !== -1}
            iconName="setting"
            onClick={() => {
              setIsActivePathname("/settings");
              history.push("/settings");
            }}
            expantionList={[
              <NavigationRail.ExpantionMenuItem
                isActive={isActivePathname === "/settings/user"}
                title="user setting"
                onClick={() => {
                  setIsActivePathname("/settings/user");
                  history.push("/settings/user");
                }}
              />,
              <NavigationRail.ExpantionMenuItem
                isActive={false}
                title="logout"
              />,
            ]}
          />
        </NavigationRail.Content>
      </NavigationRail>
      <NavigationRail.MainContent>{children}</NavigationRail.MainContent>
    </NavigationRail.Container>
  );
};

const Main = styled.main`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

const Container = styled.div`
  height: 100%;
`;
