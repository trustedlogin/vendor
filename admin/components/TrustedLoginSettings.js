import { Form, Submit } from "./index";
import { __ } from "@wordpress/i18n";
import { useView } from "../hooks/useView";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import { DangerZone, DebugLogSettings } from "../components/Sections";
import { OnboardingLayout } from "../components/Onboarding";
import { useSettings } from "../hooks/useSettings";
import { useMemo } from "react";
import {
  AddTeam,
  TeamsList,
  EditTeam,
  CreateFirstTeam,
} from "../components/Teams";

const GeneralSettings = () => {
  return (
    <>
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <PageHeader
          title={"Settings"}
          subTitle={"Manage your TrustedLogin settings"}
        />
        <div className="space-y-6">
          <DebugLogSettings />
          <DangerZone />
        </div>
      </div>
    </>
  );
};

const TeamsSettings = () => {
  const { currentView, setCurrentView } = useView();
  const { addTeam, onSave, settings } = useSettings();
  const teams = useMemo(() => {
    return settings && settings.hasOwnProperty("teams") ? settings.teams : [];
  }, [settings]);

  if ("teams/new" === currentView) {
    return (
      <AddTeam
        onSave={(newTeam) => {
          addTeam(newTeam);
          onSave();
          setCurrentView("teams");
        }}
      />
    );
  }
  if (!teams.length) {
    return (
      <CreateFirstTeam
        onClick={() => {
          setCurrentView("teams/new");
        }}
      />
    );
  }
  return <TeamsList />;
};

/**
 * TrustedLogin Settings screen
 */
export default function () {
  const { currentView } = useView();
  const { settings } = useSettings();
  const teams = useMemo(() => {
    return settings && settings.hasOwnProperty("teams") ? settings.teams : [];
  }, [settings]);

  if (currentView.startsWith("teams/edit/")) {
    return <div>Edit Team</div>;
  }
  switch (currentView) {
    case "onboarding":
      return <OnboardingLayout />;
    case "teams/add":
      return <AddTeam />;
    case "teams":
      if (!teams.length) {
        return <CreateFirstTeam />;
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
