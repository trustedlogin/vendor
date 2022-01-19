<?php
namespace TrustedLogin\Vendor\Tests;

use TrustedLogin\Vendor\Endpoints\Settings;
use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\TeamSettings;

/**
 * Tests Settings REST API
 */
class SettingsRestApiTest extends \WP_UnitTestCase
{



	/**
	 *
	 * @covers SettingsApi::fromSaved()
	 * @covers SettingsApi::to_array()
	 * @covers Endpoint::
	 */
	public function test_get_settings_via_rest_api()
	{
		$accountId = '12216';
		$accountId2 = '1226';
		$data = [
			[
				'account_id'       => $accountId,
				'private_key'      => 'a217',
				'api_key'       	=> 'a218',
				'helpdesk'         => [ 'helpscout' ],

			],
			[
				'account_id'       => $accountId2,
				'private_key'      => 'b227',
				'api_key'       	=> 'b228',
			]
		];

		$settings = new SettingsApi($data);
		$settings->save();

		$endpoint = new Settings();
		$r = $endpoint->get(new \WP_REST_Request());
		$this->assertSame(
			$accountId,
			$r->get_data()['teams'][0]['account_id']
		);
		$this->assertSame(
			$accountId2,
			$r->get_data()['teams'][1]['account_id']
		);

		$this->assertSame(
			['helpscout'],
			$r->get_data()['teams'][0]['helpdesk']
		);
		$this->assertNotEmpty(
			$r->get_data()['teams'][0][TeamSettings::HELPDESK_SETTINGS]
		);
	}
}
