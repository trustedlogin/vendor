import { __ } from "@wordpress/i18n";
import { useState, Fragment } from "react";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import ViewProvider from "../hooks/useView";
import SettingsProvider from "../hooks/useSettings";

let initialView = null;
if( window && window.tlInitialView  ){
  initialView = window.tlInitialView  ;
}
export default function App({ getSettings, updateSettings, hasOnboarded }) {
  const [notice, setNotice] = useState(() => {
    return {
      text: "",
      type: "",
      visible: false,
    };
  });

  return (
    <Fragment>
      <SettingsProvider
        hasOnboarded={hasOnboarded}
        api={{
          getSettings,
          updateSettings,
        }}>
        <ViewProvider
          initialView={initialView}
        >
          <TrustedLoginSettings />
        </ViewProvider>
      </SettingsProvider>
    </Fragment>
  );
}
