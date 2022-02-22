import { createContext, useContext, useState, useEffect } from "react";
import { useSettings } from "./useSettings";

const ViewContext = createContext();

export const useView = () => {
  const context = useContext(ViewContext);
  return context;
};

export default function ViewProvider({ children }) {
  const { hasOnboarded } = useSettings();

  //Which view to show
  const [currentView, setCurrentView] = useState(() => {
    return hasOnboarded ? "teams" : "onboarding";
  });

  //The ID of team to show in view
  const [currentTeam, setCurrentTeam] = useState(false);

  //Unset current team when changing view to not show team details
  useEffect(() => {
    if (!["teams/edit"].includes(currentView)) {
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
