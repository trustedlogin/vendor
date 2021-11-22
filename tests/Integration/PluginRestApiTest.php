<?php
namespace TrusteLoginVendor\Tests\Integration;

use PHPUnit\Framework\TestCase;
use TrustedLogin\Vendor\Plugin;
use TrustedLogin\Vendor\Endpoints\Endpoint;
class PluginRestApiTest extends TestCase {

    /**
	 * Test REST Server
	 *
	 * @var WP_REST_Server
	 */
	protected $server;

    public function setUp() {
		parent::setUp();
		/** @var WP_REST_Server $wp_rest_server */
		global $wp_rest_server;
		$this->server = $wp_rest_server = new \WP_REST_Server;
		do_action( 'rest_api_init' );

	}

	/**
	 * @covers TrustedLogin\Vendor\Plugin::restApiInit()
	 * @covers \TrustedLogin\Vendor\Endpoints\Settings::register()
	 * @covers \TrustedLogin\Vendor\Endpoints\PublicKey::register()
	 * @covers \TrustedLogin\Vendor\Endpoints\Signature::register()
	 */
    public function testRestApiInit(){

		$routes = $this->server->get_routes();
		foreach ([
			'settings',
			'public_key',
			'signature_key'
		] as $route ) {
			$this->assertArrayHasKey(
				sprintf( '/%s/%s', Endpoint::NAMESPACE,$route),
			$routes );
		}
    }

	/**
	 * @covers \TrustedLogin\Vendor\Endpoints\PublicKey::get()
	 */
	public function testGetPublicKeyViaApi(){
		$endpoint = new \TrustedLogin\Vendor\Endpoints\PublicKey();
		$r = $endpoint->get( new \WP_REST_Request() );
		$this->assertSame(
			trustedlogin_vendor()->getPublicKey(),
			$r->get_data()['publicKey']
		);

	}

	/**
	 * @covers \TrustedLogin\Vendor\Endpoints\SignatureKey::get()
	 */
	public function testGetSignatureKeyViaApi(){
		$endpoint = new \TrustedLogin\Vendor\Endpoints\SignatureKey();
		$r = $endpoint->get( new \WP_REST_Request() );
		$this->assertSame(
			trustedlogin_vendor()->getSignatureKey(),
			$r->get_data()['signatureKey']
		);
	}
}
