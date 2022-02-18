import { createContext, useContext, useState,useMemo,useEffect } from "react";

const defaultSettings = {
  isConnected: false,
  hasOnboarded: true,
  teams: [],
  helpscout: {
    secret: "",
    callback: "",
  },
};

const emptyTeam = {
  account_id: "",
  private_key: "",
  public_key: "",
  helpdesk: "",
  approved_roles: [],
};
const SettingsContext = createContext(defaultSettings);




/**
 * This hook handles setting state.
 */
export const useSettings = () => {
  //@todo bring back notice state and setNotice
  const setNotice = () => {};
  const {
    settings,
    setSettings,
    api
   } = useContext(SettingsContext);
  /**
   * Add a team to settings
   */
  const addTeam = (team,save = false) => {
    team = Object.assign(emptyTeam, team);
    const teams = [
      ...settings.teams,
      {
        id: settings.teams.length + 1,
        ...team,
      },
    ];

    //Save
    api.updateSettings({teams})
      .then(({ teams }) => {
        //Update team (new teams should get new fields server-side)
        setSettings({ ...settings, teams });
      });

  };
  /**
   * Remove a team.
   */
  const removeTeam = (id) => {
    api.updateSettings({
      ...settings,
      teams: settings.teams.filter((team) => team.id !== id),
    })
      .then(({ teams }) => {
        setSettings({ ...settings, teams });
        setNotice({
          text: "Team deleted",
          type: "sucess",
          visible: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Update one team in settings
   */
  const setTeam = (team) => {
    setSettings({
      ...settings,
      teams: settings.teams.map((t) => {
        if (t.id === team.id) {
          return team;
        }
        return t;
      }),
    });
  };

  //Disables/enables save button
  const canSave = useMemo(() => {
    return settings.teams.length > 0;
  }, [settings.teams]);

  ///Handles save
  const onSave = () => {
    api.updateSettings({ teams: settings.teams })
      .then(({ teams }) => {
        setSettings({ ...settings, teams });
        setNotice({
          text: "Settings Saved",
          type: "sucess",
          visible: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    settings,
    setSettings,
    addTeam,
    removeTeam,
    setTeam,
    onSave,
    canSave,
  };
};

export default function SettingsProvider({
  api,
  children
}) {
  const [settings, setSettings] = useState(defaultSettings);
  //Get the saved settings
  useEffect(() => {
    api.getSettings().then(({ teams, helpscout }) => {
      setSettings({
        ...settings,
        teams,
        helpscout,
      });
    });
  }, [api]);

  return (
    <SettingsContext.Provider value={{
      settings,
      setSettings,
      api
    }}>
      {children}
    </SettingsContext.Provider>
  );
}
