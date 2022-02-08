import { __ } from "@wordpress/i18n";
import { useMemo, useState, useEffect } from "react";
import { Notice, BigButton } from "../components";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import { OnboardingLayout } from "../components/Onboarding";
import { Tabs } from "@imaginary-machines/wp-admin-components";
import AccessKeyForm from "../components/AccessKeyForm";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import SettingSection from "../components/SettingSection";
import { DangerZone, DebugLogSettings } from "../components/Sections";

const defaultSettings = {
  isConnected: false,
  hasOnboarded: false,
  teams: [],
  helpscout: {
    secret: "",
    callback: "",
  },
};

const addEmptyTeam = (teams) => {
  return [
    ...teams,
    {
      id: teams.length + 1,
      account_id: "",
      private_key: "",
      api_key: "",
      helpdesk: "",
      approved_roles: [],
    },
  ];
};

export default function App({ getSettings, updateSettings }) {
  const [settings, setSettings] = useState(() => {
    return defaultSettings;
  });

  const [notice, setNotice] = useState(() => {
    return {
      text: "",
      type: "",
      visible: false,
    };
  });

  /**
   * Add a team to settings
   */
  const addTeam = () => {
    setSettings({
      ...settings,
      teams: addEmptyTeam(settings.teams),
    });
  };

  /**
   * Remove a team.
   */
  const removeTeam = (id) => {
    updateSettings({
      ...settings,
      teams: settings.teams.filter((team) => team.id !== id),
    })
      .then(({ teams }) => {
        setSettings({ ...settings, teams });
        setNotice({
          text: "Team deleted",
          type: "sucess",
          visible: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Update one team in settings
   */
  const setTeam = (team) => {
    setSettings({
      ...settings,
      teams: settings.teams.map((t) => {
        if (t.id === team.id) {
          return team;
        }
        return t;
      }),
    });
  };

  //Disables/enables save button
  const canSave = useMemo(() => {
    return settings.teams.length > 0;
  }, [settings.teams]);

  ///Handles save
  const onSave = (e) => {
    e.preventDefault();
    updateSettings({ teams: settings.teams })
      .then(({ teams }) => {
        setSettings({ ...settings, teams });
        setNotice({
          text: "Settings Saved",
          type: "sucess",
          visible: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Get the saved settings
  useEffect(() => {
    getSettings().then(({ teams, helpscout }) => {
      setSettings({
        ...settings,
        teams,
        helpscout,
      });
    });
  }, [getSettings, setSettings]);

  //Show onboaring if not onboarded
  if (!settings.hasOnboarded) {
    return <OnboardingLayout />;
  }
  //Show primary UI if has onboarded
  return (
    <Layout>
      <TopBar status={"Connected"} />
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
    </Layout>
  );

  return (
    <div className="mt-24">
      {!settings.isConnected ? (
        <Notice
          heading={__("Connect your site to the TrustedLogin service.")}
          description={__("Sign up at TrustedLogin.com")}
          link="https://trustedlogin.com"
          type="warning"
        />
      ) : null}

      <div className="m-8">
        <>
          <Tabs
            //initialTab={"teams"}
            tabs={[
              {
                id: "teams",
                children: (
                  <>
                    <section id="team-buttons" class="m-24">
                      <BigButton
                        onClick={addTeam}
                        variant={
                          !settings.teams.length ? "primary" : "secondary"
                        }
                        className={"add-team-button"}>
                        {__("Add Team")}
                      </BigButton>
                    </section>
                    <section>
                      <TrustedLoginSettings
                        settings={settings}
                        setSettings={setSettings}
                        setTeam={setTeam}
                        canSave={canSave}
                        onSave={onSave}
                        removeTeam={removeTeam}
                      />
                      {notice.visible ? (
                        <Notice heading={notice.text} type={notice.type} />
                      ) : null}
                    </section>
                  </>
                ),
                label: "Teams",
              },
              {
                id: "accces-key-login",
                children: (
                  <div>
                    <AccessKeyForm
                      teams={settings.teams || []}
                      initialAccountId={
                        settings.teams.length
                          ? settings.teams[0].account_id
                          : ""
                      }
                    />
                  </div>
                ),
                label: "Login With Access Key",
              },
            ]}
          />
        </>
      </div>
    </div>
  );
}
