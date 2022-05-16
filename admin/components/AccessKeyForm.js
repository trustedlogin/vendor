import { useMemo, useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useSettings } from "../hooks/useSettings";
import { HorizontalLogo } from "./TrustedLoginLogo";
import { SelectFieldArea, InputFieldArea } from "./teams/fields";
import TitleDescriptionLink from "./TitleDescriptionLink";

const AccessKeyForm = ({ initialAccountId = null }) => {
  const [accessKey, setAccessKey] = useState("");
  const { settings } = useSettings();

  //Get teams from settings.
  const teams = useMemo(() => {
    return settings && settings.hasOwnProperty("teams") ? settings.teams : [];
  }, [settings]);

  const [accountId, setAccountId] = useState(initialAccountId);

  //Get all teams as options
  const teamsOption = useMemo(() => {
    if (!teams) {
      return [];
    }
    return teams.map((t) => {
      return {
        label: t.account_id,
        value: t.name ? t.name : t.account_id,
      };
    });
  }, [teams]);

  //This the form  action, where to redirect to.
  const action = useMemo(() => {
    if (!window || !window.tlVendor || !window.tlVendor.accessKeyActions) {
      return null;
    }
    const actions = window.tlVendor.accessKeyActions;
    let action = actions.hasOwnProperty(accountId) ? actions[accountId] : null;
    if (accessKey) {
      action = `${action}&ak=${accessKey}`;
    }
    console.log({ action });
    return action;
  }, [teams, accountId, accessKey, window.tlVendor]);

  useEffect(() => {
    if (teams.length == 1) {
      setAccountId(teams[0].account_id);
    }
  }, [teams, setAccountId]);

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto bg-white rounded-lg px-8 py-3 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:px-14 sm:py-8">
          <div className="w-full p-8 text-center">
            <HorizontalLogo />
          </div>
          <TitleDescriptionLink
            title={__("Log In Using Access Key", "trustedlogin-vendor")}
          />
          <form
            method={"POST"}
            action={action}
            className="flex flex-col py-6 space-y-6 justify-center">
            {null !== initialAccountId ? (
              <input type="hidden" name="account_id" value={accountId} />
            ) : (
              <SelectFieldArea
                name="account_id"
                id="account_id"
                label={__("Account ID", "trustedlogin-vendor")}
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}>
                <>
                  <select
                    name="account_id"
                    id="account_id"
                    className="bg-white block w-full pl-3 pr-8 py-2.5 sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500">
                    {teamsOption.map(({ label, value }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </>
              </SelectFieldArea>
            )}
            <div className="relative rounded-lg">
              <InputFieldArea
                name="access_key"
                id="access_key"
                label={__("Access Key", "trustedlogin-vendor")}>
                <input
                  value={accessKey}
                  onChange={(e) => setAccessKey(e.target.value)}
                  type="text"
                  name="access_key"
                  id="access_key"
                  className="block w-full pl-4 pr-10 py-4 sm:text-md border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                  placeholder={__(
                    "Paste key received from customer",
                    "trustedlogin-vendor"
                  )}
                />
              </InputFieldArea>
            </div>
            <input
              type="submit"
              className="inline-flex justify-center p-4 border border-transparent text-md font-medium rounded-lg text-white bg-blue-tl hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
              value={__("Log In", "trustedlogin-vendor")}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default AccessKeyForm;
