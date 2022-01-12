<?php
namespace TrustedLogin\Vendor\Endpoints;

use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\TeamSettings;

class Settings extends Endpoint
{


	/** @inheritdoc */
	protected function route()
	{
		return 'settings';
	}

	/** @inheritdoc */
	protected function updateArgs()
	{
		return [
			'teams' => [
				'type' => 'array',
				'required' => true
			]
		];
	}

	/**
	 * Handler for requests to GET settings
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	public function get(\WP_REST_Request $request)
	{
		return rest_ensure_response(
			SettingsApi::from_saved()->to_array()
		);
	}

	/**
	 * Handler for requests to POST settings updates
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	public function update(\WP_REST_Request $request)
	{
		$settings_api = SettingsApi::from_saved()->reset();
		$teams = $request->get_param('teams', []);
		if (! empty($teams)) {
			foreach ($teams as $team) {
				try {
					$teamSetting = new TeamSettings(
						$team
					);
					$this->verifyAccountId(
						$teamSetting
					);

					$settings_api->add_setting($teamSetting);
				} catch (\Throwable $th) {
					throw $th;
				}
			}
		}

		$settings_api->save();
		return rest_ensure_response(
			//Get from saved so generated secret/ url is returned
			SettingsApi::from_saved()->to_array()
		);
	}

	public function verifyAccountId(TeamSettings $team){
		$r = \trustedlogin_vendor()->getApiHandler(
			$team->get('account_id'),
			'',
			$team
		)->verify(
			$team->get('account_id')
		);
		if( ! is_wp_error($r) ){
			$team->set(
				'connected',
				true
			);
			$team->set( 'status', $r->status );
			$team->set( 'name', $r->name );
		}else{
			$team->set(
				'connected',
				false
			);
			$team->set( 'status', 'error' );
		}

		return ! is_wp_error($r);
	}


}
