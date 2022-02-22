import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import { getSettings, updateSettings } from "../api";
const hasOnboarded = window.tlVendor.onboarding === "COMPLETE";
window.addEventListener("load", function () {
  render(
    <App
      {...{
        getSettings,
        updateSettings,
        hasOnboarded,
      }}
    />,
    document.getElementById("trustedlogin-settings")
  );
});
