<?php

namespace TrustedLogin\Vendor\Tests;

use TrustedLogin\Vendor\SettingsApi;

use TrustedLogin\Vendor\Encryption;
use TrustedLogin\Vendor\AccessKeyLogin;

class AccesKeyLoginTest extends \WP_UnitTestCase
{
	use MocksTLApi;

	const ACCOUNT_ID = 'test-tl-service';
	const ACCESS_KEY = 'a218';
	public function setUp()
	{
		$this->setTlApiMock();
		SettingsApi::from_saved()->reset()->save();
		$settings = new SettingsApi([
			[
				'account_id'       => self::ACCOUNT_ID,
				'private_key'      => 'a217',
				'api_key'       	=> self::ACCESS_KEY,
			],
			[
				'account_id'       => '1226',
				'private_key'      => 'b227',
				'api_key'       	=> 'b228',
			]
		]);

		$settings->save();
		parent::setUp();
	}


	public function tearDown()
	{
		foreach ([
			AccessKeyLogin::ACCESS_KEY_INPUT_NAME,
			AccessKeyLogin::ACCOUNT_ID_INPUT_NAME,
			AccessKeyLogin::NONCE_NAME,
			'_wp_http_referer'

		] as $key) {
			unset($_REQUEST[ $key]);
		}
		SettingsApi::from_saved()->reset()->save();
		//Always reset API sender
		$this->resetTlApiMock();
		parent::tearDown();
	}

	/**
	 * @group AccessKeyLogin
	 * @covers TrustedLogin\Vendor\AccessKeyLogin::verify_grant_access_request()
	 */
	public function testVerifyRequest()
	{
		$ak = new AccessKeyLogin();
		//Check for no_access_key error
		$this->assertTrue(
			is_wp_error(
				$ak->verify_grant_access_request()
			)
		);
		$this->assertArrayHasKey(
			'no_access_key',
			$ak->verify_grant_access_request()->errors
		);
		//Set access key
		$_REQUEST[ AccessKeyLogin::ACCESS_KEY_INPUT_NAME ] ='something';
		//Check for no no_account_id error
		$this->assertTrue(
			is_wp_error(
				$ak->verify_grant_access_request()
			)
		);
		$this->assertArrayHasKey(
			'no_account_id',
			$ak->verify_grant_access_request()->errors
		);
		//Set account id
		$_REQUEST[ AccessKeyLogin::ACCOUNT_ID_INPUT_NAME ] = 'whatever';
		//Check for no no_nonce
		$this->assertTrue(
			is_wp_error(
				$ak->verify_grant_access_request()
			)
		);
		$this->assertArrayHasKey(
			'no_nonce',
			$ak->verify_grant_access_request()->errors
		);


		//Set invalid nonce
		$_REQUEST[AccessKeyLogin::NONCE_NAME ] = wp_create_nonce('bad-action');
		//Check for no no_referrer
		$this->assertTrue(
			is_wp_error(
				$ak->verify_grant_access_request()
			)
		);
		$this->assertArrayHasKey(
			'no_referrer',
			$ak->verify_grant_access_request()->errors
		);
		///set _wp_http_referer
		$_REQUEST['_wp_http_referer'] = 'https://something.com';

		//Return false, not error
		$this->assertFalse(
			$ak->verify_grant_access_request()
		);

		//Set valid nonce
		$_REQUEST[AccessKeyLogin::NONCE_NAME ] = wp_create_nonce(AccessKeyLogin::NONCE_ACTION);

		$this->assertTrue(
			$ak->verify_grant_access_request()
		);
	}

	/**
	 * @group AccessKeyLogin
	 * @covers AccessKeyLogin::handle()
	 */
	public function testHandler()
	{

		//Set mock API for TrustedLogin eCommerce
		$this->setTlApiMock();
		//Handler that will lways return true on verification.
		$handler = new class extends AccessKeyLogin {
			public function verify_grant_access_request()
			{
				return true;
			}
		};
		//Set up REQUEST var
		$access_key = self::ACCESS_KEY;
		$_REQUEST[ AccessKeyLogin::ACCESS_KEY_INPUT_NAME ]= $access_key;
		$account_id = self::ACCOUNT_ID;
		$_REQUEST[ AccessKeyLogin::ACCOUNT_ID_INPUT_NAME] = $account_id;


		//login - we test authentication in self::testVerifyRequest()
		wp_set_current_user(self::factory()->user->create());


		//Set encryption keys to same vendor keys as test envelope was encrypted with.
		add_filter('trustedlogin/vendor/encryption/get-keys', function () {
			return $this->getEncryptionKeys();
		});

		//Run handler, expect it to return the envelope, as an array
		$output = $handler->handle();
		$this->assertIsArray( $output );
		//With the right things in it
		$this->assertArrayHasKey( 'loginurl', $output);
		$this->assertTrue(
			(bool)filter_var($output['loginurl'], FILTER_VALIDATE_URL)
		);
		$this->assertArrayHasKey( 'siteurl', $output);
		$this->assertSame( 'https://trustedlogin.support', $output['siteurl']);
	}

	/**
	 * @covers AccessKeyLogin::url()
	 */
	public function testUrl(){
		$this->assertTrue(
			(bool)filter_var(AccessKeyLogin::url('arms','helpscout'), FILTER_VALIDATE_URL)
		);
	}

	/**
	 * @covers AccessKeyLogin::makeSecret()
	 */
	public function testMakeSecret(){
		$this->assertTrue(
			is_string(AccessKeyLogin::makeSecret())
		);
	}

}
