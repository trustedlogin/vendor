import { __ } from "@wordpress/i18n";
import { useMemo, useState, useEffect } from "react";
import { Notice, BigButton } from "../components";
import TrustedLoginSettings from "../components/TrustedLoginSettings";
import HelpDeskSettings from "../components/HelpDeskSettings";

import { Tabs } from "@imaginary-machines/wp-admin-components";

const defaultSettings = {
	isConnected: false,
	teams: [],
	helpscout: {
		secret: "",
		callback: "",
	},
};

const addEmptyTeam = (teams) => {
	return [
		...teams,
		{
			id: teams.length + 1,
			account_id: "",
			private_key: "",
			api_key: "",
			helpdesk: "",
			approved_roles: [],
		},
	];
};

export default function App({ getSettings, updateSettings }) {
	const [settings, setSettings] = useState(() => {
		return defaultSettings;
	});

	const [notice, setNotice] = useState(() => {
		return {
			text: "",
			type: "",
			visible: false,
		};
	});

	/**
	 * Add a team to settings
	 */
	const addTeam = () => {
		setSettings({
			...settings,
			teams: addEmptyTeam(settings.teams),
		});
	};

	/**
	 * Update one team in settings
	 */
	const setTeam = (team) => {
		setSettings({
			...settings,
			teams: settings.teams.map((t) => {
				if (t.id === team.id) {
					return team;
				}
				return t;
			}),
		});
	};

	//Disables/enables save button
	const canSave = useMemo(() => {
		return settings.teams.length > 0;
	}, [settings.teams]);

	///Handles save
	const onSave = (e) => {
		e.preventDefault();
		updateSettings({ teams: settings.teams, helpscout: settings.helpscout })
			.then(() => {
				setNotice({
					text: "Settings Saved",
					type: "sucess",
					visible: true,
				});
			})
			.catch((err) => {
				console.log(r);
			});
	};

	//Get the saved settings
	useEffect(() => {
		getSettings().then(({ teams, helpscout }) => {
			setSettings({
				...settings,
				teams,
				helpscout,
			});
		});
	}, [getSettings, setSettings]);

	return (
		<div>
			{!settings.isConnected ? (
				<Notice
					heading={__("Connect your site to the TrustedLogin service.")}
					description={__("Sign up at TrustedLogin.com")}
					link="https://trustedlogin.com"
					type="warning"
				/>
			) : null}

			<div>
				<>
					<Tabs
						initialTabe={"two"}
						tabs={[
							{
								id: "teams",
								children: (
									<>
										<BigButton
											onClick={addTeam}
											variant={!settings.teams.length ? "primary" : "secondary"}
										>
											{__("Add Team")}
										</BigButton>
										<TrustedLoginSettings
											settings={settings}
											setSettings={setSettings}
											setTeam={setTeam}
											canSave={canSave}
											onSave={onSave}
										/>
										{notice.visible ? (
											<Notice heading={notice.text} type={notice.type} />
										) : null}
									</>
								),
								label: "Teams",
							},
							{
								id: "helpdesks",
								children: (
									<HelpDeskSettings
										settings={settings}
										setSettings={setSettings}
										canSave={canSave}
										onSave={onSave}
									/>
								),
								label: "help",
								label: "Help Desks",
							},
							{
								id: "access",
								children: <div>Access Logs</div>,
								label: "Access Logs",
							},
						]}
					/>
				</>
			</div>
		</div>
	);
}
