import { LogoutOptions, RedirectLoginOptions } from "@auth0/auth0-react";
import { Flex, Spinner } from "ingred-ui";
import { BrowserRouter, Router } from "react-router-dom";
import styled from "styled-components";
import { AppRoute } from "./AppRoute";
import { AppNavigation } from "./NavigationRail";

const Main = styled.main`
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
`;

export const RouterContainer = ({
  isLoading,
  logout,
  isAuthenticated,
  loginWithRedirect,
}: {
  isLoading: boolean;
  logout: (options?: LogoutOptions | undefined) => void;
  isAuthenticated: boolean;
  loginWithRedirect: (
    options?: RedirectLoginOptions | undefined
  ) => Promise<void>;
}) => (
  <Main>
    <BrowserRouter>
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
    </BrowserRouter>
  </Main>
);
