import { createTheme, ThemeProvider, Toast } from "ingred-ui";
import { useAuth0 } from "@auth0/auth0-react";
import { UrqlProvider } from "./context/UrqlProvider";
import { RouterContainer } from "./components/container/RouterContainer/RouterContainer";

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
          <RouterContainer
            isLoading={isLoading}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
            isAuthenticated={isAuthenticated}
          />
        </UrqlProvider>
      </Toast.Provider>
    </ThemeProvider>
  );
};
