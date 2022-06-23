import { createContext, useContext, useState, useEffect } from "react";
import { useSettings } from "./useSettings";

const ViewContext = createContext();

export const useView = () => {
  const context = useContext(ViewContext);
  return context;
};

/**
 * Provides state for which view and which team we are currently in.
 *
 * Basically this is a router, that doesn't change the URL.
 * Could have used <HashRouter> but that would have required react-router-dom
 * See: https://github.com/trustedlogin/vendor/issues/104
 */
export default function ViewProvider({
  children,
  //Preselet a view to load by default
  initialView = null,
  //Preselect a team to load by default
  initialTeam = null,
}) {
  const { hasOnboarded, teams } = useSettings();

  //Which view to show
  const [currentView, setCurrentView] = useState(() => {
    if (initialView) {
      return initialView;
    }
    if (window.tlInitialView) {
      return window.tlInitialView;
    }
    return hasOnboarded ? "teams" : "onboarding";
  });

  //The ID of team to show in view
  //team.id, not team.account_id
  //This is used to set the team that is used by:
  // TeamEdit and AccessKeyForm
  const [currentTeam, setCurrentTeam] = useState(initialTeam);

  //Unset current team when changing view to not show team details
  //This is a footgun.
  useEffect(() => {
    if (!["teams/edit", "teams/access_key"].includes(currentView)) {
      setCurrentTeam(false);
    }
  }, [currentView]);

  return (
    <ViewContext.Provider
      value={{
        currentView,
        setCurrentView,
        currentTeam,
        setCurrentTeam,
      }}>
      {children}
    </ViewContext.Provider>
  );
}
