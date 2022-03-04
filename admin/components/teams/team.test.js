import AddTeam from "./AddTeam";
import { render, act } from "@testing-library/react";

import NoTeams from "./NoTeams";
import EditTeam from "./EditTeam";
import TeamsList from "./TeamsList";
import Provider, { testTeam } from "../TestProvider";
const team = testTeam;
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
describe("TeamsList", () => {
  it("Renders & Matches snapshot", () => {
    const Wrapper = (props) => <Provider {...props} initialTeams={[team]} />;
    const { container } = render(<TeamsList />, {
      wrapper: Wrapper,
    });
    expect(container).toMatchSnapshot();
  });
});
