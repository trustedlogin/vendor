import { useSettings } from "../hooks/useSettings";
import { useView } from "../hooks/useView";
import { useRef, useMemo } from "react";
import { PageHeader } from "../components/Layout";
import { InputField, SelectField } from "./fields";

export const EditTeam = ({
  team = null,
  onClickSave,
  formTitle = "Update Team",
}) => {
  const { setCurrentView } = useView();
  const formRef = useRef();

  const handleSave = (e) => {
    e.preventDefault();
    let team = {};
    const data = new FormData(formRef.current);
    for (let [key, value] of data) {
      team[key] = value;
    }
    if (team.hasOwnProperty("approved_roles")) {
      team.approved_roles = [team.approved_roles];
    } else {
      team.approved_roles = [];
    }
    onClickSave(team);
  };
  return (
    <>
      <form
        className="flex px-5 pt-20 sm:px-10"
        ref={formRef}
        onSave={handleSave}>
        <div className="flex flex-col w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow sm:p-14 sm:pb-8">
          <svg
            className="mx-auto"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#00AADD" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28 26C26.9391 26 25.9217 25.5786 25.1716 24.8284C24.4214 24.0783 24 23.0609 24 22C24 20.9391 24.4214 19.9217 25.1716 19.1716C25.9217 18.4214 26.9391 18 28 18C29.0609 18 30.0783 18.4214 30.8284 19.1716C31.5786 19.9217 32 20.9391 32 22C32 23.0609 31.5786 24.0783 30.8284 24.8284C30.0783 25.5786 29.0609 26 28 26ZM22 36C20.9391 36 19.9217 35.5786 19.1716 34.8284C18.4214 34.0783 18 33.0609 18 32C18 30.9391 18.4214 29.9217 19.1716 29.1716C19.9217 28.4214 20.9391 28 22 28C23.0609 28 24.0783 28.4214 24.8284 29.1716C25.5786 29.9217 26 30.9391 26 32C26 33.0609 25.5786 34.0783 24.8284 34.8284C24.0783 35.5786 23.0609 36 22 36V36ZM34 36C32.9391 36 31.9217 35.5786 31.1716 34.8284C30.4214 34.0783 30 33.0609 30 32C30 30.9391 30.4214 29.9217 31.1716 29.1716C31.9217 28.4214 32.9391 28 34 28C35.0609 28 36.0783 28.4214 36.8284 29.1716C37.5786 29.9217 38 30.9391 38 32C38 33.0609 37.5786 34.0783 36.8284 34.8284C36.0783 35.5786 35.0609 36 34 36Z"
              stroke="white"
              stroke-width="2"
            />
            <rect
              x="4"
              y="4"
              width="48"
              height="48"
              rx="24"
              stroke="#CDEFF9"
              stroke-width="8"
            />
          </svg>
          <div className="max-w-sm mx-auto mb-8 justify-center text-center">
            <h2 className="mt-4 text-2xl text-gray-900">{formTitle}</h2>
            <p className="mt-2 mb-4 text-sm text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare tortor in nisl fermentum.
            </p>
            <a className="text-blue-tl text-sm" href="#">
              Where can I find this info?
            </a>
          </div>
          <div className="flex flex-col py-6 space-y-6 sm:space-y-0 sm:space-x-12 sm:flex-row">
            <div className="flex flex-col space-y-6 sm:flex-1">
              <InputField
                type="text"
                name="account_id"
                id="account_id"
                label="Account ID"
                defaultValue={team?.account_id}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#98A2B3"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              />
              <InputField
                type="text"
                name="public_key"
                id="public_key"
                label={"Public Key"}
                defaultValue={team?.public_key}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#98A2B3"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              />

              <InputField
                type="text"
                name="private_key"
                id="private_key"
                label={"Private Key"}
                defaultValue={team?.private_key}
                icon={
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.06004 6.00004C6.21678 5.55449 6.52614 5.17878 6.93334 4.93946C7.34055 4.70015 7.8193 4.61267 8.28483 4.69252C8.75035 4.77236 9.17259 5.01439 9.47676 5.37573C9.78093 5.73706 9.94741 6.19439 9.94671 6.66671C9.94671 8.00004 7.94671 8.66671 7.94671 8.66671M8.00004 11.3334H8.00671M14.6667 8.00004C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00004C1.33337 4.31814 4.31814 1.33337 8.00004 1.33337C11.6819 1.33337 14.6667 4.31814 14.6667 8.00004Z"
                      stroke="#98A2B3"
                      stroke-width="1.33333"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                }
              />
            </div>
            <div className="flex flex-col space-y-6 sm:flex-1">
              <SelectField
                id="approved_roles"
                name="approved_roles"
                label={"What Roles Provide Support?"}>
                <option>Select Roles</option>
                <option value={"administrator"}>Administrator</option>
                <option value={"editor"}>Editor</option>
                <option value={"contributor"}>Contributor</option>
              </SelectField>
              <SelectField
                id="help-desks"
                name="help-desks"
                label={"Help Desk"}>
                <option>Select a Help Desk</option>
                <option value={"helpscout"}>Help Scout</option>
                <option value={"zendesk"}>Zendesk</option>
              </SelectField>
            </div>
          </div>
          <div className="pt-8 mt-4 border-t">
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setCurrentView("teams");
                }}
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                Cancel
              </button>
              <button
                onClick={handleSave}
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-tl hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                Create Team
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export const AddTeam = () => {
  const { addTeam } = useSettings();
  const { setCurrentView } = useView();
  const onClickSave = (newTeam) => {
    addTeam(newTeam, true);
    setCurrentView("teams");
  };
  return <EditTeam onClickSave={onClickSave} formTitle={"Add Team"} />;
};
export const CreateFirstTeam = () => {
  const { setCurrentView } = useView();
  return (
    <>
      <div className="flex px-5 pt-12 sm:px-10 sm:pt-32">
        <div className="flex flex-col justify-center text-center w-full max-w-lg mx-auto p-8 bg-white rounded-lg shadow sm:p-14">
          <svg
            className="mx-auto"
            width="56"
            height="56"
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="4" width="48" height="48" rx="24" fill="#00AADD" />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M28 26C26.9391 26 25.9217 25.5786 25.1716 24.8284C24.4214 24.0783 24 23.0609 24 22C24 20.9391 24.4214 19.9217 25.1716 19.1716C25.9217 18.4214 26.9391 18 28 18C29.0609 18 30.0783 18.4214 30.8284 19.1716C31.5786 19.9217 32 20.9391 32 22C32 23.0609 31.5786 24.0783 30.8284 24.8284C30.0783 25.5786 29.0609 26 28 26ZM22 36C20.9391 36 19.9217 35.5786 19.1716 34.8284C18.4214 34.0783 18 33.0609 18 32C18 30.9391 18.4214 29.9217 19.1716 29.1716C19.9217 28.4214 20.9391 28 22 28C23.0609 28 24.0783 28.4214 24.8284 29.1716C25.5786 29.9217 26 30.9391 26 32C26 33.0609 25.5786 34.0783 24.8284 34.8284C24.0783 35.5786 23.0609 36 22 36V36ZM34 36C32.9391 36 31.9217 35.5786 31.1716 34.8284C30.4214 34.0783 30 33.0609 30 32C30 30.9391 30.4214 29.9217 31.1716 29.1716C31.9217 28.4214 32.9391 28 34 28C35.0609 28 36.0783 28.4214 36.8284 29.1716C37.5786 29.9217 38 30.9391 38 32C38 33.0609 37.5786 34.0783 36.8284 34.8284C36.0783 35.5786 35.0609 36 34 36Z"
              stroke="white"
              stroke-width="2"
            />
            <rect
              x="4"
              y="4"
              width="48"
              height="48"
              rx="24"
              stroke="#CDEFF9"
              stroke-width="8"
            />
          </svg>
          <h2 className="mt-4 text-2xl text-gray-900">
            Create your first team
          </h2>
          <p className="mt-2 mb-8 text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare
            tortor in nisl fermentum.
          </p>
          <button
            onClick={() => setCurrentView("teams/new")}
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-lg text-white bg-blue-tl focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:text-sm">
            <svg
              className="mr-1"
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
        </div>
      </div>
    </>
  );
};

export const TeamsList = () => {
  const { settings } = useSettings();
  const teams = useMemo(() => {
    return settings.teams;
  }, [settings]);
  const { currentView, setCurrentView, setCurrentTeam } = useView();
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
                      <button
                        onClick={() => {
                          setCurrentView(`teams/edit`);
                          setCurrentTeam(team.account_id);
                        }}
                        className="text-sm text-blue-tl">
                        Edit
                      </button>
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
