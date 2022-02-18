import { Form, Submit } from "./index";
import { __ } from "@wordpress/i18n";
import { useView } from "../hooks/useView";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import { DangerZone, DebugLogSettings } from "../components/Sections";
import { OnboardingLayout } from "../components/Onboarding";
import { useSettings } from "../hooks/useSettings";
import { useMemo } from "react";
import Teams from "../components/Teams";
const TeamsList = () => {
  const { settings } = useSettings();
  const teams = useMemo(() => {
    return settings.teams;
  }, [settings]);
  const { currentView, setCurrentView } = useView();
  const enabled = true; //?
  return (
    <>
      <div className="flex flex-col px-5 py-6 sm:px-10">
        <PageHeader
          title={"Teams"}
          subTitle={"Manage your TrustedLogin settings"}
          Button={() => (
            <>
              <div>
                <label for="search" className="sr-only">
                  Search
                </label>
                <div class="relative h-full">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    id="search"
                    name="search"
                    class="block w-full h-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:text-sm sm:py-2"
                    placeholder="Search..."
                    type="search"
                  />
                </div>
              </div>
              <button
                onClick={() => setCurrentView("teams/new")}
                type="button"
                class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                <svg
                  class="mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24">
                  <g fill="none">
                    <path
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      stroke="#FFFFFF"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"></path>
                  </g>
                </svg>
                Add Team
              </button>
            </>
          )}
        />
        <div className="flex flex-col justify-center w-full bg-white rounded-lg shadow">
          <ul role="list" className="divide-y divide-gray-200 px-5 sm:px-8">
            {teams.map((team) => {
              return (
                <li
                  key={team.id}
                  className="py-5 flex flex-col items-center justify-between sm:py-8 sm:flex-row">
                  <div className="flex w-full items-center space-x-5 sm:w-auto">
                    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 bg-purple-600 text-white text-sm font-medium rounded-lg">
                      TN
                    </div>
                    <div className="flex flex-row space-x-16 items-center w-full justify-between sm:justify-start">
                      <div className="flex flex-col max-w-[10rem] sm:max-w-[8rem] md:max-w-none">
                        <p
                          className="text-lg font-medium text-gray-900 leading-tight min-w-[6rem]"
                          id="team-option-1-label">
                          {team.account_id}
                        </p>
                        <p
                          className="text-sm text-gray-500"
                          id="team-option-1-description">
                          {team.account_id}
                        </p>
                      </div>
                      <div className="flex items-center justify-self-end">
                        <p className="text-sm mr-4 sm:w-18">
                          148 <span className="text-gray-500">logins</span>
                        </p>
                        <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">
                          <svg
                            className="-ml-1 mr-0.5 flex-shrink-0 self-center h-4 w-4 text-green-600"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true">
                            <path
                              fill-rule="evenodd"
                              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                              clip-rule="evenodd"
                            />
                          </svg>
                          <span className="sr-only">Increased by</span>
                          5%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-5 w-full mt-4 justify-between sm:w-auto sm:mt-0">
                    <div className="flex items-center space-x-4">
                      <a className="text-sm text-blue-tl" href="#">
                        Edit
                      </a>
                      <a className="text-sm text-gray-500" href="#">
                        Delete
                      </a>
                    </div>
                    <button
                      type="button"
                      className={`${
                        enabled ? "bg-blue-tl" : "bg-gray-200"
                      } ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500`}
                      role="switch"
                      aria-checked="true"
                      aria-labelledby="privacy-option-1-label"
                      aria-describedby="privacy-option-1-description">
                      <span
                        aria-hidden="true"
                        className={`${
                          enabled ? "translate-x-5" : "translate-x-0"
                        } inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};
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
      <Teams.Add
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
      <Teams.Empty
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

  if ("teams/new" === currentView) {
    return <Teams.Add />;
  }
  if (!teams.length) {
    return <Teams.Empty />;
  }

  switch (currentView) {
    case "onboarding":
      return <OnboardingLayout />;
    case "teams/add":
      return <Teams.Add />;
    case "teams":
      if (!teams.length) {
        return <Teams.Empty />;
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
