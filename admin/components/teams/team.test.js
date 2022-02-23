import AddTeam from "./AddTeam";
import { render, act } from "@testing-library/react";
import ViewProvider from "../../hooks/useView";
import SettingsProvider from "../../hooks/useSettings";
import NoTeams from "./NoTeams";
import EditTeam from "./EditTeam";
const team = {
  account_id: "1",
  private_key: "asda",
  public_key: "fsaffff",
  helpdesk: "HelpScout",
  approved_roles: [],
};
const api = {
  getSettings: async () => {
    return {
      teams: [team],
    };
  },
  updateSettings: async () => {},
};

const Provider = ({ children }) => (
  <SettingsProvider api={api} hasOnboarded={true} initialTeams={[team]}>
    <ViewProvider>{children}</ViewProvider>
  </SettingsProvider>
);

describe("AddTeam", () => {
  it("Renders & Matches snapshot", () => {
    const { container } = render(<AddTeam />, { wrapper: Provider });
    expect(container).toMatchSnapshot();
  });
});

describe("NoTeams", () => {
  it("Renders & Matches snapshot", () => {
    const { container } = render(<NoTeams />, { wrapper: Provider });
    expect(container).toMatchSnapshot();
  });
});

describe("EditTeam", () => {
  it("Renders & Matches snapshot", () => {
    const { container } = render(<EditTeam team={team} />, {
      wrapper: Provider,
    });
    expect(container).toMatchSnapshot();
  });
});
