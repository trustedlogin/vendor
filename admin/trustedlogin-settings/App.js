import { __ } from "@wordpress/i18n";
import { useMemo, useState, useEffect } from "react";
import { Notice, BigButton } from "../components";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import { OnboardingLayout } from "../components/Onboarding";
import { Tabs } from "@imaginary-machines/wp-admin-components";
import AccessKeyForm from "../components/AccessKeyForm";
import Layout, { TopBar } from "../components/Layout";
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
        <div className="pb-6 mb-6 border-b md:flex md:items-center md:justify-between md:space-x-5">
          <div className="flex items-center space-x-5">
            <div>
              <h2 className="text-2xl text-gray-900">Settings</h2>
              <p className="mt-1 text-sm text-gray-500">
                Manage your TrustedLogin settings
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
            <button
              type="button"
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
              id="sort-menu-button"
              aria-expanded="false"
              aria-haspopup="true">
              <svg
                className="text-gray-500 mr-2"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0001 0.5H2.0001V2.5H10.0001C11.7001 2.5 13.0001 3.8 13.0001 5.5C13.0001 7.2 11.7001 8.5 10.0001 8.5H4.4001L7.4001 5.5L6.0001 4.1L0.600098 9.5L6.0001 14.9L7.4001 13.5L4.4001 10.5H10.0001C12.8001 10.5 15.0001 8.3 15.0001 5.5C15.0001 2.7 12.8001 0.5 10.0001 0.5Z"
                  fill="currentColor"
                />
              </svg>
              Reset All
            </button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex flex-col justify-center w-full bg-white p-8 rounded-lg shadow">
            <div className="md:flex md:items-center md:justify-between md:space-x-5">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-14 w-14 rounded-full"
                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div>
                  <h2 className="leading-tight text-xl text-gray-900">
                    Mary Smith
                  </h2>
                  <p className="text-sm text-gray-500">
                    mary.smith@example.com
                  </p>
                </div>
              </div>
              <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                <button
                  type="button"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
                  id="sort-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  View Account
                  <svg
                    className="ml-2 text-gray-500"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.8335 10.1666L10.1668 1.83325M10.1668 1.83325H1.8335M10.1668 1.83325V10.1666"
                      stroke="currentColor"
                      stroke-width="1.67"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-white border border-gray-300 rounded-lg px-4 py-2 inline-flex items-center justify-center text-sm font-medium text-red-700 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-red-700"
                  id="sort-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true">
                  Disconnect Account
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center w-full bg-white p-8 pb-0 rounded-lg shadow">
            <div className="flex items-center space-x-5">
              <div>
                <h2 className="text-xl text-gray-900">Logging</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
              <li className="py-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center h-12 w-12 border border-gray-300 rounded-lg">
                    <svg
                      className="text-gray-900"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 7V23"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 13H4"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4 5L6.1 7.1"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.9999 5L17.8999 7.1"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M4 21.9999L6.1 19.8999"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M19.9999 21.9999L17.8999 19.8999"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20 13H23"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M9 3L7 1"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 3L17 1"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.9 5.19995C18.4 6.79995 20 9.89995 20 13.5C20 18.7 16.4 23 12 23C7.6 23 4 18.7 4 13.5C4 9.89995 5.7 6.79995 8.1 5.19995"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 2C10 2 8.3 3.5 8 5.5C8 5.5 10 7 12 7C14 7 16 5.5 16 5.5C15.7 3.5 14 2 12 2Z"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p
                      className="font-medium text-gray-900"
                      id="logging-option-1-label">
                      Debug Logging
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      id="logging-option-1-description">
                      When enabled, logs will be saved to the
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-gray-200 ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="logging-option-1-label"
                  aria-describedby="logging-option-1-description">
                  <span
                    aria-hidden="true"
                    className="translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </li>
              <li className="py-8 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center h-12 w-12 border border-gray-300 rounded-lg">
                    <svg
                      className="text-gray-900"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.1001 16C9.5001 18.4 12.1001 20 15.0001 20C19.4001 20 23.0001 16.4 23.0001 12C23.0001 7.6 19.4001 4 15.0001 4C12.0001 4 9.5001 5.6 8.1001 8"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M1 12H18"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15 9L18 12L15 15"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <p
                      className="font-medium text-gray-900"
                      id="logging-option-2-label">
                      Activity Log
                    </p>
                    <p
                      className="text-sm text-gray-500"
                      id="logging-option-2-description">
                      Activity Log shows a log of users attempting to log into
                      customer sites using access keys.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-blue-tl ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  role="switch"
                  aria-checked="true"
                  aria-labelledby="logging-option-2-label"
                  aria-describedby="logging-option-2-description">
                  <span
                    aria-hidden="true"
                    className="translate-x-5 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"></span>
                </button>
              </li>
            </ul>
          </div>
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
