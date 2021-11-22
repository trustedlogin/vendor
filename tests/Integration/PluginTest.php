<?php
namespace TrusteLoginVendor\Tests\Integration;

use PHPUnit\Framework\TestCase;
use TrustedLogin\Vendor\Plugin;
use TrustedLogin\Vendor\TeamSettings;

use TrustedLogin\Vendor\Endpoints\Endpoint;
class PluginTest extends TestCase {


	/**
	 * @covers TrustedLogin\Vendor\Plugin\getPublicKey
	 */
	public function testGetPublicKey(){

		$this->assertNotEmpty(
			trustedlogin_vendor()->getPublicKey(),

		);

	}

	/**
	 * @covers TrustedLogin\Vendor\Plugin\getPublicKey
	 */
	public function testGetSignatureKey(){

		$this->assertNotEmpty(
			trustedlogin_vendor()->getSignatureKey(),

		);

	}

	public function testGetApiHandler(){
		//Add a team
		$setting = new TeamSettings(
			[
				'account_id'       => '6a',
				'private_key'      => '7',
				'api_key'       	=> '8',
			]
		);
		$setting = \TrustedLogin\Vendor\SettingsApi::from_saved()
			->update_by_account_id(
				$setting
			)
			->save();

		$handler = trustedlogin_vendor()->getApiHandler(
			'6a',
			'https://test.com'
		);
		$this->assertSame(
			'https://test.com',
			$handler->get_api_url()
		);
		$this->assertNotEmpty($handler->get_x_tl_token());
	}
}
