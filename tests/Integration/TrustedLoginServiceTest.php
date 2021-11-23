<?php
namespace TrustedLogin\Vendor\Tests;

use TrustedLogin\Vendor\Endpoints\Settings;
use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\TrustedLoginService;
use TrustedLogin\Vendor\Contracts\SendsApiRequests;
/**
 *
 */
class TrustedLoginServiceTests extends \WP_UnitTestCase {
    const ACCOUNT_ID = 'test-tl-service';
    public function setUp() {


        SettingsApi::from_saved()->reset()->save();
        $settings = new SettingsApi([
			[
				'account_id'       => self::ACCOUNT_ID,
				'private_key'      => 'a217',
				'api_key'       	=> 'a218',
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

    public function tearDown() {
        SettingsApi::from_saved()->reset()->save();

        parent::tearDown();
    }

    /**
     * @covers TrustedLoginService::api_get_secret_ids()
     */
    public function testGetSecretIds() {
        $sender = new class implements SendsApiRequests {
			public $method;
			public function send( $url, $data, $method, $additional_headers ){
                $json =file_get_contents(__DIR__ . '/data/sites-200.json');
				return [
                    'body' => $json
                ];
			}
		};
        $this->assertNotEmpty(
            SettingsApi::from_saved()
                ->get_by_account_id(
                    self::ACCOUNT_ID,
                )
        );
		trustedlogin_vendor()->setApiSender(
			$sender
		);
        $service = new TrustedLoginService(
            trustedlogin_vendor()
        );
        $r = $service->api_get_secret_ids('accessKey1',self::ACCOUNT_ID);
        $this->assertTrue(
            is_wp_error($r)
        );
        wp_set_current_user(self::factory()->user->create());
        $r = $service->api_get_secret_ids('accessKey1',self::ACCOUNT_ID);
        $this->assertIsArray(
            $r
        );
        $this->assertNotEmpty($r);(
            $r
        );

    }

}
