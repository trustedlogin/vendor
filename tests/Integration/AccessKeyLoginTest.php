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
	 * @covers AccessKeyLogin::handle()
	 */
	public function testHandler()
	{
		$this->markTestIncomplete("Need to figure out how to avoid exiting");
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

		$handle = function ($handler) {
			return (array)json_decode($handler->handle(), true);
		};
		add_filter('wp_die_ajax_handler', function (...$args) {
			var_dump(1);
			exit;
		});

		wp_set_current_user(self::factory()->user->create());
		$r = $handle($handler);
		$this->assertFalse(
			is_wp_error($r)
		);
	}
}
