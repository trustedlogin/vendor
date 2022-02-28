import { useMemo, useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { useSettings } from "../hooks/useSettings";
import { HorizontalLogo } from "./TrustedLoginLogo";

const AccessKeyForm = ({ initialAccountId }) => {
  const [accountId, setAccountId] = useState(initialAccountId);
  const [accessKey, setAccessKey] = useState("");
  const { settings } = useSettings();

  //Get teams from settings.
  const teams = useMemo(() => {
    return settings && settings.hasOwnProperty("teams") ? settings.teams : [];
  }, [settings]);

  //Get all teams as options
  const teamsOption = useMemo(() => {
    if (!teams) {
      return [];
    }
    return teams.map((t) => {
      return {
        label: t.account_id,
        value: t.account_id,
      };
    });
  }, [teams]);

  //This the form  action, where to redirect to.
  const action = useMemo(() => {
    if (!window || !window.tlVendor || !window.tlVendor.accesKeyActions) {
      return null;
    }
    const actions = window.tlVendor.accesKeyActions;
    return actions.hasOwnProperty(accountId) ? actions[accountId] : null;
  }, [teams, accountId]);

  useEffect(() => {
    setAccountId(initialAccountId);
  }, [initialAccountId, setAccountId]);

  //On submit, do redirect.
  function submitHandler(e) {
    e.preventDefault();
    const redirect = `${action}&ak=${accessKey}`;
    alert(redirect); //alert so we see it first.
    window.location = redirect; //Will this be blocked by the browser?
  }

  if (!action) {
    return null;
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mx-auto bg-white rounded-lg px-8 py-3 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:px-14 sm:py-8">
        <div className="w-full p-8 text-center">
          <HorizontalLogo />
        </div>
        <div className="max-w-sm mx-auto mb-8 justify-center text-center">
          <h2 className="mt-4 text-2xl text-gray-900">
            {__("Log In Using Access Key", "trustedlogin-vendor")}
          </h2>
          <p className="mt-2 mb-4 text-sm text-gray-500">

          </p>
          <a className="text-blue-tl text-sm" href="#">
            {__("Where can I find this info?", "trustedlogin-vendor")}
          </a>
        </div>
        <form
          method={"GET"}
          action={action}
          onSubmit={submitHandler}
          className="flex flex-col py-6 space-y-6 justify-center">
          <input type="hidden" name="account_id" value={accountId} />
          <div className="relative rounded-lg">
            <input
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              type="text"
              name="access_key"
              id="access_key"
              className="block w-full pl-4 pr-10 py-4 sm:text-md border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
              placeholder={__("Paste key received from customer", "trustedlogin-vendor")}
            />
          </div>
          <button
            onClick={submitHandler}
            type="submit"
            className="inline-flex justify-center p-4 border border-transparent text-md font-medium rounded-lg text-white bg-blue-tl hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
            {__("Log In", "trustedlogin-vendor")}
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <CenteredLayout
      title={__("Login With Access Key", "trustedlogin-vendor")}
      subTitle={
        __("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare tortor in nisl fermentum.", "trustedlogin-vendor")
      }>
      <a class="text-blue-tl text-sm" href="#">
        {__("Where can I find this info?", "trustedlogin-vendor")}
      </a>
      <form
        method={"GET"}
        action={action}
        onSubmit={(e) => {
          e.preventDefault();
          const redirect = `${action}&ak=${accessKey}`;
          alert(redirect);
          window.location = redirect;
        }}>
        <div className="relative rounded-lg">
          <input
            type="text"
            name="access-key"
            id="access-key"
            class="block w-full pl-4 pr-10 py-4 sm:text-md border border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 focus:ring-1 ring-offset-2 focus:ring-sky-500"
            placeholder={__("Access Key", "trustedlogin-vendor")}
          />
        </div>
        <button
          type="submit"
          class="inline-flex justify-center p-4 border border-transparent text-md font-medium rounded-lg text-white bg-blue-tl hover:bg-indigo-700 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
          {__("Log In", "trustedlogin-vendor")}
        </button>
      </form>
    </CenteredLayout>
  );
  return (
    <Form
      method={"GET"}
      action={action}
      onSubmit={(e) => {
        e.preventDefault();
        const redirect = `${action}&ak=${accessKey}`;
        alert(redirect);
        window.location = redirect;
      }}>
      <FormTable title={__("Log Into Site Using Access Key", "trustedlogin-vendor")}>
        <>
          <Input
            label={__("Access Key", "trustedlogin-vendor")}
            name="access_key"
            value={accessKey}
            onChange={(value) => setAccessKey(value)}
          />
          {!initialAccountId ? (
            <Select
              label={__("Account ID", "trustedlogin-vendor")}
              value={accountId}
              onChange={(value) => setAccountId(value)}
              name="account_id"
              options={teamsOption}
            />
          ) : (
            <input type="hidden" name="account_id" value={accountId} />
          )}
        </>
        <BigButton type="submit" variant={"primary"}>
          {__("Login", "trustedlogin-vendor")}
        </BigButton>
      </FormTable>
    </Form>
  );
};

export default AccessKeyForm;
