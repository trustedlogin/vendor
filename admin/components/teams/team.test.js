import AddTeam from "./AddTeam";
import { render, act, fireEvent } from "@testing-library/react";

import NoTeams from "./NoTeams";
import EditTeam, { HelpDeskSelect } from "./EditTeam";
import TeamsList from "./TeamsList";
import Provider, { testTeam } from "../TestProvider";
import teamFields from "./teamFields";
import { useRef } from "react";
import collectTeam from "./collectTeam";
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
describe("HelpDeskSelect", () => {
  const options = [
    { label: "Helpscout", value: "helpscout" },
    { label: "Zendesk", value: "zendesk" },
  ];
  it("Renders & Matches snapshot", () => {
    const Wrapper = (props) => <Provider {...props} />;
    const { container } = render(<HelpDeskSelect />, {
      wrapper: Wrapper,
    });
    expect(container).toMatchSnapshot();
  });

  it("Has options", () => {
    const { container } = render(<HelpDeskSelect options={options} />, {
      wrapper: Provider,
    });
    expect(container.querySelectorAll("option").length)
      //Add one for placeholder
      .toBe(options.length + 1);
  });
  it("Sets default, default value", () => {
    const { getByLabelText } = render(<HelpDeskSelect options={options} />, {
      wrapper: Provider,
    });
    expect(getByLabelText(teamFields.helpdesk.label).value).toBe("helpscout");
  });
  it("Sets default value", () => {
    const { getByLabelText } = render(
      <HelpDeskSelect options={options} defaultValue={"zendesk"} />,
      {
        wrapper: Provider,
      }
    );
    expect(getByLabelText(teamFields.helpdesk.label).value).toBe("zendesk");
  });

  it("Changes value", () => {
    const { getByLabelText } = render(<HelpDeskSelect options={options} />, {
      wrapper: Provider,
    });
    act(() => {
      fireEvent.change(getByLabelText(teamFields.helpdesk.label), {
        target: { value: "zendesk" },
      });
    });
    expect(getByLabelText(teamFields.helpdesk.label).value).toBe("zendesk");
  });

  it("Changes value and collectTeams has that value", () => {
    const fn = jest.fn();
    const Test = () => {
      const formRef = useRef();
      const onSubmit = (e) => {
        e.preventDefault();
        const team = collectTeam(formRef.current);
        fn(team);
      };

      return (
        <form ref={formRef} onSubmit={onSubmit} data-testid="test">
          <HelpDeskSelect options={options} />
        </form>
      );
    };
    const { getByLabelText, getByTestId } = render(<Test />, {
      wrapper: Provider,
    });
    act(() => {
      fireEvent.change(getByLabelText(teamFields.helpdesk.label), {
        target: { value: "zendesk" },
      });
    });
    act(() => {
      fireEvent.submit(getByTestId("test"));
    });
    expect(fn).toBeCalledTimes(1);
    expect(fn).toBeCalledWith({
      [teamFields.approved_roles.id]: [],
      [teamFields.helpdesk.id]: "zendesk",
    });
  });
});
