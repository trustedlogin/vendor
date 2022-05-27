import AccessKeyForm from "./AccessKeyForm";
import { render } from "@testing-library/react";
import TestProvider, { testTeam } from "./TestProvider";
const team = testTeam;

const Provider = (props) => <TestProvider hasOnboarded={true} {...props} />;
describe("Access Key Login Form", () => {
  beforeEach(() => {
    window.tlVendor = {
      accessKey: {
        action: "trustedlogin",
        provider: "test",
        _tl_ak_nonce: "nonce",
      },
    };
  });
  it("renders and matches snapshot", () => {
    const { container } = render(
      <AccessKeyForm initialAccountId={team.account_id} />,
      { wrapper: Provider }
    );
    expect(container).toMatchSnapshot();
  });
});
