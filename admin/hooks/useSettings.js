import { createContext, useContext, useState, useMemo, useEffect } from "react";

const defaultSettings = {
  isConnected: false,
  hasOnboarded: true,
  teams: [],
  integrations: {
    helpscout: false,
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
  const { settings, setSettings, api, hasOnboarded } =
    useContext(SettingsContext);

  const _updateTeams = (teams) => {
    teams = teams.map((t, i) => {
      return {
        id: i + 1,
        ...t,
      };
    });
    setSettings({ ...settings, teams });
  };

  /**
   * Add a team to settings
   */
  const addTeam = (team, save = false, callback = null) => {
    team = Object.assign(emptyTeam, { ...team, id: settings.teams.length + 1 });
    const teams = [...settings.teams, team];

    if (!save) {
      setSettings({ ...settings, teams });
      if (callback) {
        callback(team);
      }
      return;
    }
    //Save
    api.updateSettings({ teams }).then(({ teams }) => {
      //Update team (new teams should get new fields server-side)
      _updateTeams(teams);
      if (callback) {
        callback(team);
      }
    });
  };

  /**
   * Remove a team.
   */
  const removeTeam = (id, callback = null) => {
    const teams = settings.teams.filter((team) => team.id !== id);
    api
      .updateSettings({
        ...settings,
        teams: settings.teams.filter((team) => team.id !== id),
      })
      .then(({ teams }) => {
        console.log({ teams });
        _updateTeams(teams);
        setNotice({
          text: "Team deleted",
          type: "sucess",
          visible: true,
        });
        if (callback) {
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Update one team in settings
   */
  const setTeam = (team, save = false) => {
    const teams = settings.teams.map((t) => {
      if (t.id === team.id) {
        return team;
      }
      return t;
    });

    if (!save) {
      setSettings({
        ...settings,
        teams,
      });
      return;
    }

    api
      .updateSettings({
        ...settings,
        teams,
      })
      .then(({ teams }) => {
        _updateTeams(teams);
        setNotice({
          text: "Team Saved",
          type: "sucess",
          visible: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * Check if there is a team in settings with the given account_id
   */
  const hasTeam = (account_id) => {
    return (
      -1 !== settings.teams.findIndex((team) => team.account_id === account_id)
    );
  };

  /**
   * Get a team from settings settings with the given id
   */
  const getTeam = (id) => {
    return settings.teams.find((team) => team.id === id);
  };

  //Disables/enables save button
  const canSave = useMemo(() => {
    return settings.teams.length > 0;
  }, [settings.teams]);

  ///Save all TEAM settings
  const onSave = () => {
    api
      .updateSettings({ teams: settings.teams })
      .then(({ teams }) => {
        _updateTeams(teams);
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

   ///Save all INTEGRATIONS settings
   const onSaveIntegrationSettings = async () => {
    return await api
      .updateSettings({ integrations: settings.integrations })
      .then(({ integrations }) => {
        console.log({ ...settings, integrations });
        setNotice({
          text: "Integrations Saved",
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
    getTeam,
    hasTeam,
    hasOnboarded,
    onSaveIntegrationSettings
  };
};

export default function SettingsProvider({
  api,
  hasOnboarded,
  children,
  initialTeams = null,
}) {
  const [settings, setSettings] = useState(() => {
    if (null !== initialTeams) {
      return { ...defaultSettings, teams: initialTeams };
    } else {
      return defaultSettings;
    }
  });
  //Get the saved settings
  useEffect(() => {
    if (null == initialTeams) {
      api.getSettings().then(({ teams, helpscout }) => {
        setSettings({
          ...settings,
          teams,
          helpscout,
        });
      });
    }
  }, [api, setSettings, initialTeams]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        hasOnboarded,
        api,
      }}>
      {children}
    </SettingsContext.Provider>
  );
}
