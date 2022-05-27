import { render } from "@testing-library/react";
import TrustedLoginSettings from "./TrustedLoginSettings";
import Provider, { testTeam } from "./TestProvider";
describe("TrustedLoginSettings", () => {
  it("renders & matches snapshot, with on-boarding completed", () => {
    const Wrapper = (props) => (
      <Provider {...props} hasOnboarded={true} initialTeams={[testTeam]} />
    );

    const { container } = render(<TrustedLoginSettings />, {
      wrapper: Wrapper,
    });
    expect(container).toMatchSnapshot();
  });

  it("renders & matches snapshot, with on-boarding completed AND server-side error", () => {
    window.tlVendor = {
      errorMessage: "Server error",
      accessKey: {},
    };
    const Wrapper = (props) => (
      <Provider {...props} hasOnboarded={true} initialTeams={[testTeam]} />
    );

    const { container, getByText } = render(<TrustedLoginSettings />, {
      wrapper: Wrapper,
    });
    //Run this to make sure the error text is rendered
    getByText("Server error");
    expect(container.querySelectorAll(".tl-error").length).toBe(1);
  });

  it("renders & matches snapshot, with on-boarding NOT completed", () => {
    const Wrapper = (props) => <Provider {...props} hasOnboarded={false} />;
    const { container } = render(<TrustedLoginSettings />, {
      wrapper: Wrapper,
    });
    expect(container).toMatchSnapshot();
  });
});
