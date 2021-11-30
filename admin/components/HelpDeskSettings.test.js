import { render, fireEvent, cleanup, act } from "@testing-library/react";
import HelpDeskSettings from "./HelpDeskSettings";

describe("HelpDeskSettings", () => {
	afterEach(cleanup);
	let settings = {
		isConnected: false,
		teams: [
			{
				id: 0,
				account_id: "7",
				private_key: "pk_1",
				api_key: "ak_1",
				helpdesk: "helpscout",
				approved_roles: ["editor"],
			},
		],
		helpscout: {
			callback: "",
			secret: "",
		},
	};
	it("renders with save enabled", () => {
		const onSave = jest.fn();

		const { container } = render(
			<HelpDeskSettings settings={settings} canSave={false} onSave={onSave} />
		);
		expect(container).toMatchSnapshot();
	});

	it("updates helpscout settings", () => {
		const onSave = jest.fn();
		const setSettings = jest.fn();
		const { getByLabelText } = render(
			<HelpDeskSettings
				onSave={onSave}
				settings={settings}
				canSave={true}
				setSettings={setSettings}
			/>
		);
		//Change secret
		act(() => {
			fireEvent.change(getByLabelText("Help Scout Secret Key"), {
				target: { value: "42" },
			});
		});

		expect(setSettings).toBeCalledWith({
			...settings,
			helpscout: {
				...settings.helpscout,
				secret: "42",
			},
		});

		//Change callback
		act(() => {
			fireEvent.change(getByLabelText("Help Scout Callback URL"), {
				target: { value: "https://happy.dog" },
			});
		});

		expect(setSettings).toBeCalledWith({
			...settings,
			helpscout: {
				...settings.helpscout,
				callback: "https://happy.dog",
			},
		});
	});
});
