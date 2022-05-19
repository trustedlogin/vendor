import { useMemo, useState, useEffect, useRef } from "react";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { useSettings } from "../hooks/useSettings";
import { HorizontalLogo } from "./TrustedLoginLogo";
import { SelectFieldArea, InputFieldArea } from "./teams/fields";
import TitleDescriptionLink from "./TitleDescriptionLink";

function collectFormData(form) {
  let data = {};
  const formData = new FormData(form);
  for (let [key, value] of formData) {
    data[key] = value;
  }
  return data;
}

//Get accessKey from window.tlVendor.accessKey.ak, if possible
const getAccessKey = () => {
  if (window.tlVendor && window.tlVendor.accessKey.hasOwnProperty("ak")) {
    if (window.tlVendor.accessKey.ak.length > 0) {
      return window.tlVendor.accessKey.ak;
    }
  }
  return null;
};

//Handle both parts of login
const handleLogin = async (redirectData) => {
  ["endpoint", "identifier", "loginurl", "siteurl"].forEach((key) => {
    if (!redirectData.hasOwnProperty(key)) {
      throw new Error(`Missing key ${key} in redirectData`);
    }
  });
  //Send post to login
  let r = await fetch(redirectData.loginurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: "trustedlogin",
      endpoint: redirectData.endpoint,
      identifier: redirectData.identifier,
    }),
    credentials: "include",
  });
  //Response good?
  if (r.ok()) {
    //Redirect to site,should be logged in.
    window.location = redirectData.siteurl;
    return;
  }
  throw new Error(r.statusText);
};

//Handles validating accessKey server side
//Returns redirectData for login
const exchangeAccessKey = async ({ accessKey, accountId }) => {
  try {
    //Try to get login redirect
    //https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/#usage
    const r = await apiFetch({
      path: "/trustedlogin/v1/access_key",
      method: "POST",
      data: {
        trustedlogin: "1",
        action: window.tlVendor.accessKey.action,
        provider: window.tlVendor.accessKey.provider,
        _tl_ak_nonce: window.tlVendor.accessKey._tl_ak_nonce,
        ak: accessKey,
        ak_account_id: accountId.toString(),
      },
    });
    if (r.hasOwnProperty("success") && r.success) {
      return r.data;
    }
  } catch (error) {
    return error && error.message ? error.message : __("Invalid access key");
  }
};

const AccessKeyForm = ({ initialAccountId = null }) => {
  const [accessKey, setAccessKey] = useState(() => getAccessKey());
  //If we have an access key and accoutn ID, we don't need to show the form
  const hideStepOne = useMemo(() => {
    let key = getAccessKey();
    if (null !== initialAccountId && key) {
      return true;
    }
    return false;
  }, [window.tlVendor]);
  const { settings } = useSettings();
  const [redirectData, setRedirectData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  const handler = (e) => {
    setErrorMessage("");
    let form = e.target;
    //No redirectData, trade access key for it.
    if (!redirectData) {
      setIsLoading(true);
      //Check if form input is valid
      if (!form.checkValidity()) {
        setIsLoading(false);
        return;
      }

      let data = collectFormData(form);
      e.preventDefault();
      exchangeAccessKey({ accessKey, accountId })
        .catch((err) => {
          console.log({ err });
          setIsLoading(false);
          setErrorMessage(__("An error happended."));
        })
        .then((data) => {
          if ("string" === typeof data) {
            setErrorMessage(data);
            setIsLoading(false);
            return;
          }
          handleLogin(data).catch((e) => {
            setIsLoading(false);
            setErrorMessage(e.message);
          });
        });
    }
  };
  //If we're hiding step one, submit hidden form
  useEffect(() => {
    if (!hideStepOne) {
      return;
    }
    if (!redirectData && accessKey && initialAccountId) {
      exchangeAccessKey({ accessKey, accountId: initialAccountId }).then(
        (data) => {
          handleLogin(data).catch((e) => {
            setIsLoading(false);
            setErrorMessage(e.message);
          });
        }
      );
    }
  }, [hideStepOne]);

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
          <>
            <form
              onSubmit={handler}
              id="access-key-form"
              method={"POST"}
              className="flex flex-col py-6 space-y-6 justify-center">
              <>
                <input type="hidden" name="trustedlogin" value={1} />
                <input
                  type="hidden"
                  name="action"
                  value={window.tlVendor.accessKey.action}
                />
                <input
                  type="hidden"
                  name="provider"
                  value={window.tlVendor.accessKey.provider}
                />
                <input
                  type="hidden"
                  name="_tl_ak_nonce"
                  value={window.tlVendor.accessKey._tl_ak_nonce}
                />
                {null !== initialAccountId ? (
                  <input type="hidden" name="ak_account_id" value={accountId} />
                ) : (
                  <SelectFieldArea
                    name="ak_account_id"
                    id="ak_account_id"
                    label={__("Account ID", "trustedlogin-vendor")}>
                    <>
                      <select
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        name="ak_account_id"
                        id="ak_account_id"
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
                    name="ak"
                    id="ak"
                    label={__("Access Key", "trustedlogin-vendor")}>
                    <input
                      value={accessKey}
                      onChange={(e) => setAccessKey(e.target.value)}
                      type="text"
                      name="ak"
                      id="ak"
                      className="block w-full pl-4 pr-10 py-4 sm:text-md border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
                      placeholder={__(
                        "Paste key received from customer",
                        "trustedlogin-vendor"
                      )}
                    />
                  </InputFieldArea>
                </div>

                {!hideStepOne || errorMessage.length ? (
                  <>
                    {isLoading ? (
                      <div className="spinner is-active inline-flex justify-center p-4 border border-transparent text-md font-medium rounded-lg text-white bg-blue-tl"></div>
                    ) : (
                      <input
                        type="submit"
                        className="inline-flex justify-center p-4 border border-transparent text-md font-medium rounded-lg text-white bg-blue-tl hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500"
                        value={__("Log In", "trustedlogin-vendor")}
                      />
                    )}
                  </>
                ) : null}
              </>
            </form>
            {errorMessage && (
              <div>
                <p className="error">{errorMessage}</p>
              </div>
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default AccessKeyForm;
