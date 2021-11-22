<?php
namespace TrustedLogin\Vendor\Tests;

use TrustedLogin\Vendor\Endpoints\Settings;
use TrustedLogin\Vendor\SettingsApi;

/**
 * Tests Settings REST API
 */
class SettingsRestApiTest extends \WP_UnitTestCase {



	/**
	 *
	 * @covers SettingsApi::from_saved()
	 * @covers SettingsApi::to_array()
	 * @covers Endpoint::
	 */
	public function test_get_settings_via_rest_api(){
		$data = [
			[
				'account_id'       => '12216',
				'private_key'      => 'a217',
				'api_key'       	=> 'a218',
			],
			[
				'account_id'       => '1226',
				'private_key'      => 'b227',
				'api_key'       	=> 'b228',
			]
		];

		$settings = new SettingsApi($data);
		$settings->save();
		$settings->save();

		$endpoint = new Settings();
		$r = $endpoint->get(new \WP_REST_Request());
		$this->assertSame(
			'12216',
			$r->get_data()['teams'][0]['account_id']
		);
		$this->assertSame(
			'1226',
			$r->get_data()['teams'][1]['account_id']
		);

		$this->assertSame(
			$settings->get_helpscout_data(),
			$r->get_data()['helpscout']
		);
	}

}
