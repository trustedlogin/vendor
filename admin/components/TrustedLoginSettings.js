import { Form, Submit, } from "./index";
import { __ } from "@wordpress/i18n";
import TeamSettings from "./TeamSettings";
import {Metabox,MetaboxWrapper}from '@imaginary-machines/wp-admin-components'

/**
 * TrustedLogin Settings Form
 */
export default function ({ onSave, settings, canSave, setTeam }) {

	return (
		<>
			<section id="team-wrapper">
				<>
					{settings.teams
						? settings.teams.map((team) => (
							<div key={team.id} className={"team-settings-form"}>
								<Form onSubmit={onSave} >
									<TeamSettings team={team} setTeam={setTeam} key={team.id}  />
								</Form>
							</div>

						))
						: null}
				</>
			</section>


			<Submit
				onClick={onSave}
				variant={canSave ? "primary" : "secondary"}
				value={__("Save")}
				disabled={!canSave}
			/>
		</>
	);
}
