import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";

import { AuthClient } from "@dfinity/auth-client";

const init = async () => {
  const authClient = await AuthClient.create();

  if (authClient.isAuthenticated()) {
    component(authClient);
  } else {
    authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        component(authClient);
      },
    });
  }
};

const component = async (authClient) => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

init();
