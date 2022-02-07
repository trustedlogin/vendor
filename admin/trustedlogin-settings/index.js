import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import { getSettings, updateSettings } from "../api";
window.addEventListener("load", function () {
  render(
    <App
      className="container p-4"
      {...{
        getSettings,
        updateSettings,
      }}
    />,
    document.getElementById("trustedlogin-settings")
  );
});
