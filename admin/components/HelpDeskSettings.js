import { Form, Submit, Input, FormTable } from "./index";
import { __ } from "@wordpress/i18n";
import { useMemo } from "react";

/**
 * Trusted Login Settings Form
 */
export default function ({ onSave, settings, canSave, setSettings }) {
	const helpscout = useMemo(() => {
		let defaults = {
			secret: "",
			callback: "",
		};
		return settings.hasOwnProperty("helpscout")
			? Object.assign(defaults, settings.helpscout)
			: defaults;
	}, [settings]);
	return (
		<Form onSubmit={onSave}>
			<FormTable>
				<Input
					name="helpscout[secret]"
					label={__("Help Scout Secret Key")}
					value={helpscout.secret}
					onChange={(value) => {
						setSettings({
							...settings,
							helpscout: {
								...helpscout,
								secret: value,
							},
						});
					}}
				/>
				<Input
					name="helpscout[callback]"
					label={__("Help Scout Callback URL	")}
					value={helpscout.callback}
					type="url"
					onChange={(value) => {
						setSettings({
							...settings,
							helpscout: {
								...helpscout,
								callback: value,
							},
						});
					}}
				/>
			</FormTable>
			<Submit
				onClick={onSave}
				variant={canSave ? "primary" : "secondary"}
				value={__("Save")}
				disabled={!canSave}
			/>
		</Form>
	);
}
