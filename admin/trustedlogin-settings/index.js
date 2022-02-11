import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import api from "../api";
window.addEventListener("load", function () {
  render(
    <App
      api={api}
    />,
    document.getElementById("trustedlogin-settings")
  );
});
