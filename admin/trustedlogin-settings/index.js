import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import { getSettings, updateSettings, resetTeamIntegrations } from "../api";
const hasOnboarded = window.tlVendor.onboarding === "COMPLETE";
window.addEventListener("load", function () {
  render(
    <App
      {...{
        getSettings,
        updateSettings,
        resetTeamIntegrations,
        hasOnboarded,
      }}
    />,
    document.getElementById("trustedlogin-settings")
  );
});
