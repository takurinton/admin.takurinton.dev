import {
  cacheExchange,
  CombinedError,
  createClient,
  dedupExchange,
  errorExchange,
  fetchExchange,
  makeOperation,
  Operation,
  Provider,
} from "urql";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, Flex, Spinner, ThemeProvider, Toast } from "ingred-ui";
import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { AppNavigation } from "./components/NavigationRail";
import { AppRoute } from "./route/AppRoute";
import { useMemo, ReactNode } from "react";
import { authExchange } from "@urql/exchange-auth";

const Main = styled.main`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

const UrqlProvider = ({
  user,
  getAccessTokenSilently,
  children,
}: {
  user: any;
  getAccessTokenSilently: any;
  children: ReactNode;
}) => {
  const { addToast } = Toast.useToasts();
  const localUrl = "http://localhost:3001/graphql";
  const url = "https://api-takurinton-dev.onrender.com/graphql";
  const client = useMemo(() => {
    return createClient({
      url: localUrl,
      exchanges: [
        dedupExchange,
        cacheExchange,
        authExchange({
          addAuthToOperation: ({
            authState,
            operation,
          }: {
            authState: any | null;
            operation: Operation;
          }) => {
            console.log("called addAuthToOperation");

            if (!authState) {
              return operation;
            }

            const fetchOptions =
              typeof operation.context.fetchOptions === "function"
                ? operation.context.fetchOptions()
                : operation.context.fetchOptions || {};

            return makeOperation(operation.kind, operation, {
              ...operation.context,
              fetchOptions: {
                ...fetchOptions,
                headers: {
                  ...fetchOptions.headers,
                  Authorization: authState.token,
                },
              },
            });
          },
          getAuth: async ({ authState }: { authState: any | null }) => {
            console.log("called getAuth");

            if (!authState) {
              const token = await getAccessTokenSilently();
              // const refreshToken = "";
              if (token) {
                return { token, refreshToken: "" };
              }
              return null;
            }
            return null;
          },
          didAuthError: ({
            error,
            authState,
          }: {
            error: CombinedError;
            authState: any;
          }) => {
            console.log("called didAuthError");

            return false;
          },
          willAuthError: ({
            authState,
            operation,
          }: {
            authState: any;
            operation: Operation;
          }) => {
            console.log("called willAuthError");

            return false;
          },
        }),
        errorExchange({
          onError: async (error) => {
            if (error.response?.status === 401) {
              // noop
              // 下で拾ってくれる
            }
            if (error.graphQLErrors && error.graphQLErrors.length > 0) {
              for (const graphQLError of error.graphQLErrors) {
                addToast(graphQLError.message, {
                  appearance: "error",
                  autoDismiss: true,
                });
              }
            } else {
              addToast(error.message, {
                appearance: "error",
                autoDismiss: true,
              });
            }
          },
        }),
        fetchExchange,
      ],
    });
  }, [user]);

  return <Provider value={client}>{children}</Provider>;
};

export const App = () => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    isLoading,
    getAccessTokenSilently,
    user,
  } = useAuth0();

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

  return (
    <ThemeProvider theme={theme}>
      <Toast.Provider
        placement="top-center"
        autoDismissTimeout={3000}
        transitionDuration={300}
      >
        <UrqlProvider
          user={user}
          getAccessTokenSilently={getAccessTokenSilently}
        >
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
        </UrqlProvider>
      </Toast.Provider>
    </ThemeProvider>
  );
};
