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
					$setting = new TeamSettings(
						$team
					);
					$settings_api->add_setting($setting);
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
}
