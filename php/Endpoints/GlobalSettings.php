<?php
namespace TrustedLogin\Vendor\Endpoints;

use TrustedLogin\Vendor\SettingsApi;

class GlobalSettings extends Settings
{


	/** @inheritdoc */
	protected function route()
	{
		return 'settings/global';
	}

	/** @inheritdoc */
	protected function updateArgs()
	{
		return [
			'integrations' => [
				'type' => 'object',
				'required' => true
			]
		];
	}

	/**
	 * Handler for requests to POST settings updates
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	public function update(\WP_REST_Request $request)
	{
		$settings_api = SettingsApi::fromSaved();
		if( is_array($request->get_param('integrations',false)) ){
			$settings_api->setGlobalSettings( $request->get_param('integrations') );
		}
		$settings_api->save();

		return rest_ensure_response(
			SettingsApi::fromSaved()->toArray()
		);
	}

}
