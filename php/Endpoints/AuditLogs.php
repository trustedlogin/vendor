<?php
namespace TrustedLogin\Vendor\Endpoints;

use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\Status\IsTeamConnected;
use TrustedLogin\Vendor\TeamSettings;

class AuditLogs extends Endpoint
{


	/** @inheritdoc */
	protected function route()
	{
		return 'audit_logs';
	}

	/**
	 * Handler for requests to GET settings
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	public function get(\WP_REST_Request $request)
	{
		$tl = new \TrustedLogin\Vendor\TrustedLoginService(
			$plugin
		);
		$tl->getAuditLog(10);
		//?
		return [];
	}


}
