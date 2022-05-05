import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

const domain = import.meta.env.AUTH0_DOMAIN as string;
const clientId = import.meta.env.AUTH0_CLIENT_ID as string;
ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Auth0Provider>,
  document.getElementById("takurinton")
);
