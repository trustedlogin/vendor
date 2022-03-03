import { render } from "@testing-library/react";
import { IntegrationHelpscout } from "../components/IntegrationSettings";
import Provider from "./TestProvider";
describe("IntegrationHelpscout", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(<IntegrationHelpscout />, {
      wrapper: Provider,
    });
    expect(container).toMatchSnapshot();
  });
});
