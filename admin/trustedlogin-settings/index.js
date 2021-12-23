import React from "react";
import { render } from "@wordpress/element";
import App from "./App";
import { getSettings, updateSettings } from "../api";
import "./style.scss";
window.addEventListener("load", function () {
	render(
		<App
			{...{
				getSettings,
				updateSettings,
			}}
		/>,
		document.getElementById("trustedlogin-settings")
	);
});
