import apiFetch from "@wordpress/api-fetch";

const path = "/trustedlogin/v1/settings";
export const getSettings = async () => {
  let settings = await apiFetch({ path }).catch((e) => console.log(e));
  if (settings.teams) {
    settings.teams = settings.teams.map((team, id) => {
      if (!team.helpdesk) {
        team.helpdesk = "helpscout";
      }

      return {
        id,
        ...team,
      };
    });
  }
  return settings;
};

export const updateSettings = async ({ teams }) => {
  let data = await apiFetch({
    path,
    method: "POST",
    data: {
      teams,
    },
  });
  return data;
};

export default {
  updateSettings,
  getSettings,
};
