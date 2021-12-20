<?php
namespace TrustedLogin\Vendor\Endpoints;

use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\TeamSettings;

class Settings extends Endpoint
{



	protected function route()
	{
		return 'settings';
	}

	protected function updateArgs()
	{
		return [
			'teams' => [
				'type' => 'array',
				'required' => true
			]
		];
	}

	public function get(\WP_REST_Request $request)
	{
		return rest_ensure_response(
			SettingsApi::from_saved()->to_array()
		);
	}

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
					var_dump($th);
					exit;
					throw $th;
				}
			}
		}

		$settings_api->save();
		return rest_ensure_response(
			$settings_api->to_array()
		);
	}
}
