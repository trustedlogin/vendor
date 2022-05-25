import { render } from "@testing-library/react";
import SettingsProvider from "./useSettings";
import Provider, { testTeam } from "../components/TestProvider";

const getSettings = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      jest.fn();
      resolve({ teams: [] });
    }, 300);
  });
};

describe("SettingsProvider", () => {
  it("does not make api calls", () => {
    let getSettings = jest.fn();
    let updateSettings = jest.fn();
    const api = {
      getSettings: async () => {
        getSettings();
        return new Promise((resolve) => {
          resolve();
        });
      },
      updateSettings,
    };

    const Settings = () => (
      <SettingsProvider initialTeams={[testTeam]} api={api}>
        <div>Hi</div>
      </SettingsProvider>
    );

    render(<Settings />);

    expect(getSettings).not.toHaveBeenCalled();
    expect(updateSettings).not.toHaveBeenCalled();
  });
});
