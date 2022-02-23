import AccessKeyForm from "./AccessKeyForm";
import { render } from "@testing-library/react";
import SettingsProvider from "../hooks/useSettings";
import ViewProvider from "../hooks/useView";
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

describe("Access Key Login Form", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(
      <AccessKeyForm initialAccountId={team.account_id} />,
      { wrapper: Provider }
    );
    expect(container).toMatchSnapshot();
  });
});
