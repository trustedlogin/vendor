import { __ } from "@wordpress/i18n";
import { useState, Fragment } from "react";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import ViewProvider from "../hooks/useView";
import SettingsProvider from "../hooks/useSettings";


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

        >
          <TrustedLoginSettings />
        </ViewProvider>
      </SettingsProvider>
    </Fragment>
  );
}
