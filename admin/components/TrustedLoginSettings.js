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
			<section>
				<MetaboxWrapper>
					{settings.teams
						? settings.teams.map((team) => (
							<Form onSubmit={onSave}>
								<Metabox title={team.account_id} key={team.id}>
									<TeamSettings team={team} setTeam={setTeam} key={team.id}  />
								</Metabox>
							</Form>
						))
						: null}
				</MetaboxWrapper>
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
