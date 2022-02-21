import { __ } from "@wordpress/i18n";
import { useView } from "../hooks/useView";
import Layout, { TopBar } from "../components/Layout";
import { OnboardingLayout } from "../components/Onboarding";
import { useSettings } from "../hooks/useSettings";
import { useMemo } from "react";
import { AddTeam, CreateFirstTeam } from "../components/Teams";
import TeamsSettings from "../components/teams/TeamsSettings";
import GeneralSettings from "./GeneralSettings";

/**
 * TrustedLogin Settings screen
 */
export default function () {
  const { currentView, setCurrentView } = useView();
  const { settings, addTeam } = useSettings();
  const teams = useMemo(() => {
    return settings && settings.hasOwnProperty("teams") ? settings.teams : [];
  }, [settings]);

  switch (currentView) {
    case "onboarding":
      return <OnboardingLayout />;
    case "teams/new":
      return (
        <AddTeam
          onSave={(newTeam) => {
            addTeam(newTeam);
            onSave();
            setCurrentView("teams");
          }}
        />
      );
    case "teams":
      if (!teams.length) {
        return (
          <CreateFirstTeam
            onClick={() => {
              setCurrentView("teams/new");
            }}
          />
        );
      }

    default:
      //Show primary UI if has onboarded
      return (
        <Layout>
          <TopBar status={"Connected"} />
          {"string" === typeof currentView &&
          currentView.startsWith("teams") ? (
            <TeamsSettings />
          ) : (
            <GeneralSettings />
          )}
        </Layout>
      );
  }
}
