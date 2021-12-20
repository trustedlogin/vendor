<?php
namespace TrustedLogin\Vendor\Tests;

use TrustedLogin\Vendor\Endpoint;
use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\TeamSettings;

/**
 * Tests PHP Settings API
 */
class SettingsApiTest extends \WP_UnitTestCase
{

	/**
	 * @covers TeamSettings::reset()
	 * @covers TeamSettings::to_array()
	 */
	public function test_settings_object_defaults()
	{
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'api_key'       	=> '8',


			'helpdesk_settings' => [

			]
		];
		$setting = new TeamSettings(
			$data
		);
		//Do defaults get overridden when possible?
		$this->assertSame(
			$data['api_key'],
			$setting->to_array()['api_key']
		);
		//Do default values get set when needed?
		$this->assertSame(
			[ 'helpscout' ],
			$setting->to_array()['helpdesk']
		);
	}

	/**
	 * @covers TeamSettings::reset()
	 * @covers TeamSettings::to_array()
	 */
	public function test_settings_object_reset()
	{

		$setting = new TeamSettings(
			[
				'account_id'       => '16',
				'private_key'      => '17',
				'api_key'       	=> '18',
			]
		);
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'api_key'       	=> '8',
		];
		$setting = $setting->reset($data);
		//Do defaults get overridden when possible?
		$this->assertSame(
			$data['api_key'],
			$setting->to_array()['api_key']
		);
		//Do default values get set when needed?
		$this->assertSame(
			[ 'helpscout' ],
			$setting->to_array()['helpdesk']
		);
	}

	/**
	 * @covers TeamSettings::get()
	 * @covers TeamSettings::set()
	 */
	public function test_settings_object_get_set()
	{
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'api_key'       	=> '8',
		];
		$setting = new TeamSettings(
			$data
		);

		$setting = $setting->set('account_id', '42');
		$this->assertSame(
			'42',
			$setting->get('account_id')
		);
		$this->assertSame(
			'42',
			$setting->to_array()['account_id']
		);
	}

	/**
	 * @covers TeamSettings::valid()
	 */
	public function test_settings_object_set_invalid()
	{
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'api_key'       	=> '8',
		];
		$setting = new TeamSettings(
			$data
		);

		$this->expectException(\Exception::class);
		$setting = $setting->set('droids', 'not the ones you are looking for');
	}

	/**
	 * @covers TeamSettings::valid()
	 */
	public function test_settings_object_get_invalid()
	{
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'api_key'       	=> '8',
		];
		$setting = new TeamSettings(
			$data
		);

		$this->expectException(\Exception::class);
		$setting = $setting->get('droids', 'not the ones you are looking for');
	}

	/**
	 * @covers SettingsApi::get_by_account_id()
	 * @covers TeamSettings::get()
	 */
	public function test_settings_collection_get()
	{
		$data = [
			[
				'account_id'       => '16',
				'private_key'      => '17',
				'api_key'       	=> '18',
			],
			[
				'account_id'       => '26',
				'private_key'      => '27',
				'api_key'       	=> '28',
			]
		];
		$settings = new SettingsApi($data);
		$this->assertSame(
			'27',
			$settings->get_by_account_id('26')
				->get('private_key')
		);
	}

	/**
	 *
	 * @covers SettingsApi::get_by_account_id()
	 * @covers SettingsApi::update_by_account_id()
	 * @covers TeamSettings::get()
	 * @covers TeamSettings::set()
	 */
	public function test_settings_collection_update()
	{
		$data = [
			[
				'account_id'       => '216',
				'private_key'      => '217',
				'api_key'       	=> '218',
			],
			[
				'account_id'       => '26',
				'private_key'      => '227',
				'api_key'       	=> '228',
			]
		];
		$settings = new SettingsApi($data);

		$this->assertTrue(
			is_object($settings->get_by_account_id('26'))
		);
		$settings = $settings->update_by_account_id(
			$settings->get_by_account_id('26')
				->set('private_key', 'pkforks')
		);
		$this->assertSame(
			'pkforks',
			$settings->get_by_account_id('26')
				->get('private_key')
		);
	}

	/**
	 *
	 * @covers SettingsApi::get_by_account_id()
	 */
	public function test_settings_collection_get_invalid()
	{
		$data = [
			[
				'account_id'       => '216',
				'private_key'      => '217',
				'api_key'       	=> '218',
			],
			[
				'account_id'       => '26',
				'private_key'      => '227',
				'api_key'       	=> '228',
			]
		];
		$settings = new SettingsApi($data);
		$this->expectException(\Exception::class);
		$settings->get_by_account_id('aaa26');
	}

	/**
	 * @covers TeamSettings::get_helpscout_data()
	 */
	public function test_get_helpscout_data()
	{

		update_option(SettingsApi::TEAM_SETTING_NAME, false);
		$accountId = 'a216';
		$helpscout_data = [
			'secret' => '42',
			'callback' => 'https://walk.dog'
		];
		$data = [
			[
				'account_id'       => $accountId,
				'private_key'      => 'a217',
				'api_key'       	=> 'a218',
				'helpdesk_settings' => [
					'helpscout' => $helpscout_data
				]
			],
			[
				'account_id'       => 'b26',
				'private_key'      => 'b227',
				'api_key'       	=> 'b228',
			]
		];

		$settings = new SettingsApi($data);

		$this->assertSame(
			$helpscout_data,
			$settings->get_by_account_id($accountId)->get_helpdesk_data()
		);
	}

	/**
	 *
	 * @covers SettingsApi::from_saved()
	 * @covers SettingsApi::save()
	 * @covers SettingsApi::update_by_account_id()
	 * @covers TeamSettings::get_helpscout_data()
	 * @covers TeamSettings::get()
	 * @group a
	 */
	public function test_settings_save()
	{
		update_option(SettingsApi::TEAM_SETTING_NAME, false);

		$helpscout_data = [
			'secret' => '42',
			'callback' => 'https://walk.dog'
		];
		$accountId = 'b26';
		$accountId2 = 'a216';
		$data = [
			[
				'account_id'      => $accountId2,
				'private_key'      => 'a217',
				'api_key'       => 'a218',
				'helpdesk' => 'helpscout',
			],
			[
				'account_id'       => $accountId,
				'private_key'      => 'b227',
				'api_key'       	=> 'b228',
				'helpdesk' => 'helpscout',
				'helpdesk_settings' => [
					'helpscout' => $helpscout_data
				]
			]
		];

		$settings = new SettingsApi($data);

		$settings->save();

		$settings = SettingsApi::from_saved();
		$settings->save();
		$this->assertSame(
			'b227',
			$settings->get_by_account_id($accountId)
				->get('private_key')
		);

		//Team we saved helpscout data for has helpscout data
		$this->assertSame(
			$helpscout_data,
			$settings->get_by_account_id($accountId)
			->get_helpdesk_data()
		);

		//Team we did not save helpscout data for has generated data

		$helpscout_data = $settings->get_by_account_id($accountId2)
			->get_helpdesk_data();

		//Is valid URL?
		$this->assertTrue(
			(bool)filter_var($helpscout_data['callback'], FILTER_VALIDATE_URL)
		);
		$this->assertNotEmpty(
			$helpscout_data['secret']
		);

		//It gets same everytime
		//It gets same
		$this->assertSame(
			$helpscout_data,
			SettingsApi::from_saved()->get_by_account_id($accountId2)
			->get_helpdesk_data()
		);

		update_option(SettingsApi::TEAM_SETTING_NAME, false);
	}

	/**
	 *
	 * @covers SettingsApi::has_setting()
	 */
	public function test_settings_collection_has_setting()
	{
		$data = [
			[
				'account_id'       => '216',
				'private_key'      => '217',
				'api_key'       	=> '218',
			],
			[
				'account_id'       => '126',
				'private_key'      => '227',
				'api_key'       	=> '228',
			]
		];
		$settings = new SettingsApi($data);

		$this->assertTrue(
			$settings->has_setting('216')
		);
		$this->assertTrue(
			$settings->has_setting('126')
		);
		$this->assertFalse(
			$settings->has_setting('zzzz')
		);
	}


	/**
	 *
	 * @covers SettingsApi::add_setting()
	 * @covers SettingsApi::get_by_account_id()
	 */
	public function test_add_setting_to_api()
	{
		$data = [
			[
				'account_id'       => '2216',
				'private_key'      => 'a217',
				'api_key'       	=> 'a218',
			],
			[
				'account_id'       => '126',
				'private_key'      => 'b227',
				'api_key'       	=> 'b228',
			]
		];
		$settings = new SettingsApi($data);
		$setting = new TeamSettings([
			'account_id'       => '1126',
			'private_key'      => 'pkt',
			'api_key'       	=> 'ab228',
		]);

		$settings->add_setting(
			$setting
		);
		//Has new one.
		$this->assertTrue(
			$settings->has_setting('1126')
		);
		//Still has old one
		$this->assertTrue(
			$settings->has_setting('126')
		);
		//Can also update
		$setting->set('private_key', 'pk9000');
		$settings->add_setting(
			$setting
		);
		$this->assertSame(
			'pk9000',
			$settings->get_by_account_id(
				'1126'
			)->get(( 'private_key'))
		);
	}
}
