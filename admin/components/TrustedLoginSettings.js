import { Form, Submit } from "./index";
import { __ } from "@wordpress/i18n";
import { useView } from "./View";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import { DangerZone, DebugLogSettings } from "../components/Sections";
import { OnboardingLayout } from "../components/Onboarding";

const TeamSettings = () => {


  return (
  <div className="flex flex-col px-5 py-6 sm:px-10">
      <PageHeader
        title={"Teams"}
        subTitle={"Manage your TrustedLogin settings"}
        Button={() =>(
          <>
            <div>
                <label for="search" className="sr-only">Search</label>
                <div class="relative h-full">
                    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                        </svg>
                    </div>
                    <input id="search" name="search" class="block w-full h-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500 sm:text-sm sm:py-2" placeholder="Search..." type="search" />
                </div>
            </div>
            <button type="button" class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-tl focus:outline-none focus:ring-2 ring-offset-2 focus:ring-sky-500">
                <svg class="mr-1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>
                Add Team
            </button>
          </>
        )}
      />
      <div className="space-y-6">
        ???
      </div>
  </div>
)
}
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
