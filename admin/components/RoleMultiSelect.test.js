import { render, fireEvent, cleanup, act } from "@testing-library/react";
import { FormTable } from "./index";
import RoleMultiSelect from "./RoleMultiSelect";

describe("RoleMultiSelect", () => {
	afterEach(cleanup);
	it("Renders", () => {
		const onChange = () => {};
		const { container } = render(
			<FormTable title={"Testing"}>
				<RoleMultiSelect
					approvedRoles={["administrator"]}
					help={"help"}
					label={"label"}
					onChange={onChange}
				/>
			</FormTable>
		);
		expect(container).toMatchSnapshot();
	});
});
