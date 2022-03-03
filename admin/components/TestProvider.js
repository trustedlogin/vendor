import SettingsProvider from "../hooks/useSettings";
import ViewProvider from "../hooks/useView";
export const testTeam = {
  account_id: "1",
  private_key: "asda",
  public_key: "fsaffff",
  helpdesk: "HelpScout",
  approved_roles: [],
  id: 0,
};
const mockApi = {
  getSettings: async () => {
    return {
      teams: [testTeam],
    };
  },
  updateSettings: async () => {},
};

/**
 * All providers in one.
 *
 * ONLY use for testing.
 */
const TestProvider = ({
  children,
  api = mockApi,
  hasOnboarded = true,
  initialTeams = [testTeam],
}) => (
  <SettingsProvider
    api={api}
    hasOnboarded={hasOnboarded}
    initialTeams={initialTeams}>
    <ViewProvider>{children}</ViewProvider>
  </SettingsProvider>
);

export default TestProvider;
