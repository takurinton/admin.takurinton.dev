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
  Button,
  createTheme,
  Flex,
  Icon,
  NavigationRail,
  Spinner,
  ThemeProvider,
  Typography,
  useTheme,
} from "ingred-ui";
import styled from "styled-components";
import { ReactNode, useEffect, useState } from "react";
import {
  LogoutOptions,
  RedirectLoginOptions,
  useAuth0,
} from "@auth0/auth0-react";

const localUrl = "http://localhost:3001/graphql";
const url = "https://api-takurinton-dev.onrender.com/graphql";
const client = createClient({
  url,
});

export const App = () => {
  const { isAuthenticated, loginWithRedirect, logout, isLoading, user } =
    useAuth0();

  const theme = createTheme({
    palette: {
      primary: {
        highlight: "#F2F9FC",
        light: "#ffbae0",
        main: "#ff69b4",
        dark: "#da69b4",
      },
      icon: {
        active: "#ff69b4",
      },
      background: {
        hint: "#fff4ff",
      },
      text: {
        primary: "#ff69b4",
      },
    },
  });

  // const accessToken = getAccessTokenWithPopup({
  //   audience: REACT_APP_AUTH0_AUTHORIZER_IDENTIFIER,
  //   scope: 'read:current_user',
  // });

  return (
    <ThemeProvider theme={theme}>
      <Provider value={client}>
        {/* <Toast.Provider placement="top-center"> */}
        <Main>
          <Router>
            {isLoading ? (
              <Flex
                style={{
                  width: "fit-content",
                  margin: "auto",
                  padding: "40px",
                }}
              >
                <Spinner />
              </Flex>
            ) : (
              <AppNavigation
                logout={logout}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
              >
                <AppRoute />
              </AppNavigation>
            )}
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
        takurinton管理画面
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
        アナリティクス詳細
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

const AppNavigation = ({
  children,
  logout,
  isAuthenticated,
  loginWithRedirect,
}: {
  children: ReactNode;
  logout: (options?: LogoutOptions | undefined) => void;
  isAuthenticated: boolean;
  loginWithRedirect: (
    options?: RedirectLoginOptions | undefined
  ) => Promise<void>;
}) => {
  const history = useHistory();
  const theme = useTheme();
  const color = theme.palette.primary.main;
  const [isActivePathname, setIsActivePathname] = useState(
    history.location.pathname
  );

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/");
    }
  }, [history.location.pathname]);

  return (
    <>
      {isAuthenticated ? (
        <NavigationRail.Container>
          <NavigationRail>
            <NavigationRail.Content>
              <NavigationRail.Menu
                color={"fill"}
                title="home"
                isActive={isActivePathname === "/"}
                iconName="dashboard"
                onClick={() => {
                  setIsActivePathname("/");
                  history.push("/");
                }}
              />
              <NavigationRail.Menu
                color={color}
                title="blog"
                isActive={isActivePathname === "/blog"}
                iconName="pencil"
                onClick={() => {
                  setIsActivePathname("/blog");
                  history.push("/blog");
                }}
              />
              <NavigationRail.Menu
                color={color}
                title="portfolio"
                isActive={isActivePathname === "/portfolio"}
                iconName="profile"
                onClick={() => {
                  setIsActivePathname("/portfolio");
                  history.push("/portfolio");
                }}
              />
              <NavigationRail.Menu
                color={"fill"}
                title="analytics"
                isActive={isActivePathname === "/analytics"}
                iconName="bar_chart"
                onClick={() => {
                  setIsActivePathname("/analytics");
                  history.push("/analytics");
                }}
              />
              <NavigationRail.ExpantionMenu
                color={color}
                title="Setting"
                isActive={isActivePathname.indexOf("/settings") !== -1}
                iconName="setting"
                // onClick={() => {
                //   setIsActivePathname("/settings");
                //   history.push("/settings");
                // }}
                expantionList={[
                  <NavigationRail.ExpantionMenuItem
                    color={color}
                    isActive={isActivePathname === "/settings/user"}
                    title="user setting"
                    onClick={() => {
                      setIsActivePathname("/settings/user");
                      history.push("/settings/user");
                    }}
                  />,
                  <NavigationRail.ExpantionMenuItem
                    color={color}
                    isActive={false}
                    title="logout"
                    onClick={() => {
                      logout({ returnTo: window.location.origin });
                    }}
                  />,
                ]}
              />
            </NavigationRail.Content>
            <NavigationRail.Footer>
              <NavigationRail.Fixture />
            </NavigationRail.Footer>
          </NavigationRail>
          <NavigationRail.MainContent>{children}</NavigationRail.MainContent>
        </NavigationRail.Container>
      ) : (
        <NavigationRail.Container>
          <NavigationRail>
            <NavigationRail.Content>
              <NavigationRail.Menu
                color={color}
                title="login"
                isActive={true}
                iconName="logout"
                onClick={loginWithRedirect}
              />
            </NavigationRail.Content>
            <NavigationRail.Footer>
              <NavigationRail.Fixture />
            </NavigationRail.Footer>
          </NavigationRail>
          <NavigationRail.MainContent>
            <div style={{ paddingLeft: "20px" }}>
              <Typography>ログインしてください。</Typography>
              <Button onClick={loginWithRedirect} style={{ width: "100px" }}>
                login
              </Button>
            </div>
          </NavigationRail.MainContent>
        </NavigationRail.Container>
      )}
    </>
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
