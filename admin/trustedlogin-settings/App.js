import { __ } from "@wordpress/i18n";
import { useMemo, useState, useEffect } from "react";
import { Notice, BigButton } from "../components";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import { OnboardingLayout } from "../components/Onboarding";
import { Tabs } from "@imaginary-machines/wp-admin-components";
import AccessKeyForm from "../components/AccessKeyForm";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import SettingSection from "../components/SettingSection";
import { DebugLogSettings } from "../components/Sections";

const defaultSettings = {
  isConnected: false,
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

  const isOnboarding = false;

  if (isOnboarding) {
    return <OnboardingLayout />;
  }
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

          <div className="flex flex-col justify-center w-full bg-white p-8 rounded-lg shadow space-y-8">
            <div className="flex items-center space-x-5">
              <div>
                <h2 className="text-xl text-red-700">Danger Zone</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="bg-white p-8 border border-red-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center h-12 w-12 bg-red-700 rounded-lg">
                    <svg
                      className="text-white"
                      width="22"
                      height="12"
                      viewBox="0 0 22 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.65 4C10.83 1.67 8.61 0 6 0C2.69 0 0 2.69 0 6C0 9.31 2.69 12 6 12C8.61 12 10.83 10.33 11.65 8H16V12H20V8H22V4H11.65ZM6 8C4.9 8 4 7.1 4 6C4 4.9 4.9 4 6 4C7.1 4 8 4.9 8 6C8 7.1 7.1 8 6 8Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p
                      className="font-medium text-gray-900"
                      id="dangerzone-option-1-label">
                      Reset encryption keys?
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      id="dangerzone-option-1-description">
                      If you reset the encryption keys, all previous authorized
                      logins will be inaccessible.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-white border border-red-700 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-red-700"
                  id="sort-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  Reset Keys
                </button>
              </div>
            </div>
          </div>
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
