import { Fragment } from "react";
import { PageHeader } from "./Layout";
import { DangerZone, DebugLogSettings } from "./Sections";

const GeneralSettings = () => {
  return (
    <Fragment>
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
    </Fragment>
  );
};
export default GeneralSettings;
