import { render } from "@testing-library/react";
import { IntegrationHelpscout } from "./Integration";
import { ConfigureHelscout } from "./ConfigureIntegration";
import Provider from "../TestProvider";
describe("IntegrationHelpscout", () => {
  it("renders and matches snapshot", () => {
    const { container } = render(<IntegrationHelpscout />, {
      wrapper: Provider,
    });
    expect(container).toMatchSnapshot();
  });
});
describe("ConfigureHelpscout", () => {
  beforeAll(() => {
    //@see https://stackoverflow.com/a/57270851/1469799
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}

      disconnect() {
        return null;
      }

      observe() {
        return null;
      }

      takeRecords() {
        return null;
      }

      unobserve() {
        return null;
      }
    };
  });
  it("renders and matches snapshot while closed", () => {
    const { container } = render(
      <ConfigureHelscout isOpen={false} setIsOpen={jest.fn()} />,
      {
        wrapper: Provider,
      }
    );
    expect(container).toMatchSnapshot();
  });

  it("renders and matches snapshot while open", () => {
    const { container } = render(
      <ConfigureHelscout isOpen={true} setIsOpen={jest.fn()} />,
      {
        wrapper: Provider,
      }
    );
    expect(container).toMatchSnapshot();
  });
});
