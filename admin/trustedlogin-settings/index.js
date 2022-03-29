import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import api from "../api";
const hasOnboarded = window.tlVendor.onboarding === "COMPLETE";
let initialTeams = null;
let initialIntegrationSettings = null;
//See init.php for where tlVendor is set using wp_localize_script
if (window.tlVendor) {
  initialTeams = window.tlVendor.settings.teams;
  if (initialTeams.length > 0) {
    initialTeams = initialTeams.map((team, id) => {
      return {
        ...team,
        id,
      };
    });
  }
  initialIntegrationSettings = window.tlVendor.settings.integrations;
}
window.addEventListener("load", function () {
  render(
    <App
      {...{
        ...api,
        hasOnboarded,
        initialTeams,
        initialIntegrationSettings,
      }}
    />,
    document.getElementById("trustedlogin-settings")
  );
});
