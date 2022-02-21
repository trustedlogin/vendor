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
  const { currentView, setCurrentView, currentTeam } = useView();
  const { setTeam, settings, getTeam } = useSettings();

  const team = useMemo(() => {
    if (currentTeam) {
      return getTeam(currentTeam);
    }
    return null;
  }, [getTeam, currentTeam]);

  if ("teams/edit" === currentView) {
    return (
      <EditTeam
        team={team}
        onClickSave={(updateTeam) => {
          setTeam(
            {
              ...updateTeam,
              id: team.hasOwnProperty("id")
                ? team.id
                : settings.team.length + 1,
            },
            true
          );
          setCurrentView("teams");
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
