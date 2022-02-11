import { __ } from "@wordpress/i18n";
import { useMemo, useState, useEffect } from "react";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import ViewProvider from "../hooks/useView";
import SettingsProvider from "../hooks/useSettings";





export default function App({ api }) {
  const [notice, setNotice] = useState(() => {
    return {
      text: "",
      type: "",
      visible: false,
    };
  });
  return (
    <ViewProvider
      defaultView={"teams"}
      //defaultViewProvider={!settings.hasOnboarded ? 'onboarding': 'settings'}
    >
      <SettingsProvider api={api}>
        <TrustedLoginSettings />
      </SettingsProvider>
    </ViewProvider>
  );
}
