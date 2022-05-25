/**
 * This is the entry point for the webhook/integration return page
 */

import React from "react";
import { render } from "react-dom";
import App from "./trustedlogin-settings/App";
import api from "./api";
import {
  hasOnboarded,
  initialTeams,
  initialIntegrationSettings,
} from "./trustedlogin-settings/setupVars";

window.tlInitialView = "teams/access_key";
render(
  <App
    {...{
      ...api,
      hasOnboarded,
      initialTeams,
      initialIntegrationSettings,
    }}
  />,
  document.getElementById("root")
);
