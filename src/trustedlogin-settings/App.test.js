import React from "react";
import App from "./App";
import { testTeam } from "../components/TestProvider";
import { render, act } from "@testing-library/react";
it("renders without crashing with onboarding", () => {
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
  render(
    <App
      getSettings={api.getSettings}
      updateSettings={api.updateSettings}
      hasOnboarded={true}
      initialTeams={[testTeam]}
    />
  );
  expect(getSettings).not.toHaveBeenCalled();
  expect(updateSettings).not.toHaveBeenCalled();
});

it("renders without crashing with teams UI", () => {
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

  render(
    <App
      getSettings={api.getSettings}
      updateSettings={api.updateSettings}
      hasOnboarded={false}
      initialTeams={[testTeam]}
    />
  );
  expect(getSettings).not.toHaveBeenCalled();
  expect(updateSettings).not.toHaveBeenCalled();
});
