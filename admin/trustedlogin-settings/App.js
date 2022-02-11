import { __ } from "@wordpress/i18n";
import { useMemo, useState, useEffect } from "react";
import { Notice, BigButton } from "../components";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import { Tabs } from "@imaginary-machines/wp-admin-components";
import AccessKeyForm from "../components/AccessKeyForm";
import Layout, { TopBar, PageHeader } from "../components/Layout";
import { DangerZone, DebugLogSettings } from "../components/Sections";
import View from "../components/View";

const defaultSettings = {
  isConnected: false,
  hasOnboarded: true,
  teams: [],
  helpscout: {
    secret: "",
    callback: "",
  },
};

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



export default function App({ getSettings, updateSettings }) {
  const [settings, setSettings] = useState(() => {
    return defaultSettings;
  });

  const [notice, setNotice] = useState(() => {
    return {
      text: "",
      type: "",
      visible: false,
    };
  });

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

  return (
    <View
      defaultView={"teams"}
      //defaultView={!settings.hasOnboarded ? 'onboarding': 'settings'}
    >
      <TrustedLoginSettings />
    </View>
  );
}
