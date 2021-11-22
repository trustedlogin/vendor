<?php
namespace TrusteLoginVendor\Tests\Integration;

use PHPUnit\Framework\TestCase;
use TrustedLogin\Vendor\Plugin;
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
}
