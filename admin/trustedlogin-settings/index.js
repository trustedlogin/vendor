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

/**
 * Removes all DOM nodes in array of nodes
 */
const removeAllNodes = (nodes) => {
  if( nodes && nodes.length){
    nodes.forEach( node => node.remove());
  }
};

window.addEventListener("load", function () {
  //remove notices
  removeAllNodes(document.getElementsByClassName('notice'));
  //Remove all WooCommerce messages
  removeAllNodes(document.getElementsByClassName('woocommerce-message'));
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
