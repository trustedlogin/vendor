import { Form, Submit } from "./index";
import { __ } from "@wordpress/i18n";
//import TeamSettings from "./TeamSettings";
import { useView } from "./View";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import { DangerZone, DebugLogSettings } from "../components/Sections";
import { OnboardingLayout } from "../components/Onboarding";

const TeamSettings = () => (
  <div className="flex flex-col px-5 py-6 sm:px-10">
      <PageHeader
        title={"Teams"}
        subTitle={"Manage your TrustedLogin settings"}
      />
      <div className="space-y-6">
        ???
      </div>
  </div>
);
const Settings = () => {
  const {currentView} = useView();
  switch (currentView) {
    case "teams":
      return <TeamSettings />;
    default:
      return(
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
      )
  }

}
/**
 *TrustedLogin Settings screen
 */
export default function () {
  const {currentView} = useView();
  switch (currentView) {
    case "onboarding":
      return <OnboardingLayout />;
    default:
      //Show primary UI if has onboarded
      return (
        <Layout>
          <TopBar status={"Connected"} />
          <Settings/>
        </Layout>
      );
  }
}
