import { LogoutOptions } from "@auth0/auth0-react";
import { RedirectLoginOptions } from "@auth0/auth0-spa-js";
import { Button, NavigationRail, Typography, useTheme } from "ingred-ui";
import { ReactNode, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const AppNavigation = ({
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
