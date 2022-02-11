import {createContext, useContext,useState} from 'react';

const SettingsContext = createContext();

const defaultSettings = {
  isConnected: false,
  hasOnboarded: true,
  teams: [],
  helpscout: {
    secret: "",
    callback: "",
  },
};

/**
 * Add team to collection
 */
const addEmptyTeam = (teams) => {
  return [
    ...teams,
    {
      id: teams.length + 1,
      account_id: "",
      private_key: "",
      api_key: "",
      helpdesk: "",
      approved_roles: [],
    },
  ];
};

export const useSettings = () => {
  const {settings,setSettings} = useContext(SettingsContext);
  /**
   * Add a team to settings
   */
   const addTeam = () => {
    setSettings({
      ...settings,
      teams: addEmptyTeam(settings.teams),
    });
  };
  /**
   * Remove a team.
   */
   const removeTeam = (id) => {
    updateSettings({
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
  const onSave = (e) => {
    e.preventDefault();
    updateSettings({ teams: settings.teams })
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

  //Get the saved settings
  useEffect(() => {
    getSettings().then(({ teams, helpscout }) => {
      setSettings({
        ...settings,
        teams,
        helpscout,
      });
    });
  }, [getSettings, setSettings]);
  return {
    ...context,
    addTeam,
    removeTeam,
    setTeam,
    onSave,
    canSave,
  };
}

export default function SettingsProvider({children}) {
  const [settings, setSettings] = useState(() => {
    return defaultSettings;
  });

  return (
    <SettingsContext.Provider value={{settings, setSettings}}>
      {children}
    </SettingsContext.Provider>
  )
}
