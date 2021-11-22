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

	/**
	 * @covers TrustedLogin\Vendor\Plugin::getApiHandler()
	 * @covers TrustedLogin\Vendor\ApiHandler::get_api_key()
	 */
	public function testGetApiHandler(){
		//Add a team
		$setting = new TeamSettings(
			[
				'account_id'       => '6a',
				'private_key'      => '7',
				'api_key'       	=> '8',
			]
		);
		\TrustedLogin\Vendor\SettingsApi::from_saved()
			->add_setting(
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
		$this->assertSame($setting->get( 'api_key' ), $handler->get_api_key());
	}

	/**
	 * @covers TrustedLogin\Vendor\Plugin::getEncryption()
	 */
	public function testGetEncryption(){
		$this->assertSame(
			trustedlogin_vendor()->getEncryption(),
			trustedlogin_vendor()->getEncryption(),
		);

		$this->assertSame(
			trustedlogin_vendor()->getEncryption()->get_public_key(),
			trustedlogin_vendor()->getEncryption()->get_public_key(),
		);
	}

}
