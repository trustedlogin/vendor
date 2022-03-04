import { __ } from "@wordpress/i18n";
import { useState, StrictMode } from "react";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import ViewProvider from "../hooks/useView";
import SettingsProvider from "../hooks/useSettings";

export default function App({
  getSettings,
  updateSettings,
  resetTeamIntegrations,
  hasOnboarded,
  initialTeams = null,
  initialIntegrationSettings = null,
}) {
  const [notice, setNotice] = useState(() => {
    return {
      text: "",
      type: "",
      visible: false,
    };
  });

  return (
    <StrictMode>
      <SettingsProvider
        hasOnboarded={hasOnboarded}
        initialTeams={initialTeams}
        initialIntegrationSettings={initialIntegrationSettings}
        api={{
          getSettings,
          updateSettings,
          resetTeamIntegrations,
        }}>
        <ViewProvider>
          <TrustedLoginSettings />
        </ViewProvider>
      </SettingsProvider>
    </StrictMode>
  );
}
