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
	 * @covers TeamSettings::toArray()
	 */
	public function test_settings_object_defaults()
	{
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'public_key'       	=> '8',


			'helpdesk_settings' => [

			]
		];
		$setting = new TeamSettings(
			$data
		);
		//Do defaults get overridden when possible?
		$this->assertSame(
			$data['public_key'],
			$setting->toArray()['public_key']
		);
		//Do default values get set when needed?
		$this->assertSame(
			[ 'helpscout' ],
			$setting->toArray()['helpdesk']
		);
	}

	/**
	 * @covers TeamSettings::reset()
	 * @covers TeamSettings::toArray()
	 */
	public function test_settings_object_reset()
	{

		$setting = new TeamSettings(
			[
				'account_id'       => '16',
				'private_key'      => '17',
				'public_key'       	=> '18',
			]
		);
		$data = [
			'account_id'       => '6',
			'private_key'      => '7',
			'public_key'       	=> '8',
		];
		$setting = $setting->reset($data);
		//Do defaults get overridden when possible?
		$this->assertSame(
			$data['public_key'],
			$setting->toArray()['public_key']
		);
		//Do default values get set when needed?
		$this->assertSame(
			[ 'helpscout' ],
			$setting->toArray()['helpdesk']
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
			'public_key'       	=> '8',
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
			$setting->toArray()['account_id']
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
			'public_key'       	=> '8',
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
			'public_key'       	=> '8',
		];
		$setting = new TeamSettings(
			$data
		);

		$this->expectException(\Exception::class);
		$setting = $setting->get('droids', 'not the ones you are looking for');
	}

	/**
	 * @covers SettingsApi::getByAccountId()
	 * @covers TeamSettings::get()
	 */
	public function test_settings_collection_get()
	{
		$data = [
			[
				'account_id'       => '16',
				'private_key'      => '17',
				'public_key'       	=> '18',
			],
			[
				'account_id'       => '26',
				'private_key'      => '27',
				'public_key'       	=> '28',
			]
		];
		$settings = new SettingsApi($data);
		$this->assertSame(
			'27',
			$settings->getByAccountId('26')
				->get('private_key')
		);
	}

	/**
	 *
	 * @covers SettingsApi::getByAccountId()
	 * @covers SettingsApi::updateByAccountId()
	 * @covers TeamSettings::get()
	 * @covers TeamSettings::set()
	 */
	public function test_settings_collection_update()
	{
		$data = [
			[
				'account_id'       => '216',
				'private_key'      => '217',
				'public_key'       	=> '218',
			],
			[
				'account_id'       => '26',
				'private_key'      => '227',
				'public_key'       	=> '228',
			]
		];
		$settings = new SettingsApi($data);

		$this->assertTrue(
			is_object($settings->getByAccountId('26'))
		);
		$settings = $settings->updateByAccountId(
			$settings->getByAccountId('26')
				->set('private_key', 'pkforks')
		);
		$this->assertSame(
			'pkforks',
			$settings->getByAccountId('26')
				->get('private_key')
		);
	}

	/**
	 *
	 * @covers SettingsApi::getByAccountId()
	 */
	public function test_settings_collection_get_invalid()
	{
		$data = [
			[
				'account_id'       => '216',
				'private_key'      => '217',
				'public_key'       	=> '218',
			],
			[
				'account_id'       => '26',
				'private_key'      => '227',
				'public_key'       	=> '228',
			]
		];
		$settings = new SettingsApi($data);
		$this->expectException(\Exception::class);
		$settings->getByAccountId('aaa26');
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
				'public_key'       	=> 'a218',
				'helpdesk_settings' => [
					'helpscout' => $helpscout_data
				]
			],
			[
				'account_id'       => 'b26',
				'private_key'      => 'b227',
				'public_key'       	=> 'b228',
			]
		];

		$settings = new SettingsApi($data);

		$this->assertSame(
			$helpscout_data,
			$settings->getByAccountId($accountId)->getHelpdeskData()
		);
	}

	/**
	 *
	 * @covers SettingsApi::fromSaved()
	 * @covers SettingsApi::save()
	 * @covers SettingsApi::updateByAccountId()
	 * @covers TeamSettings::get_helpscout_data()
	 * @covers TeamSettings::get()
	 */
	public function test_settings_save()
	{
		update_option(SettingsApi::TEAM_SETTING_NAME, false);

		$helpscout_data = [
			'secret' => '42',
			'callback' => 'https://walk.dog'
		];
		$accountId = 'account-one';
		$accountId2 = 'account-two';
		$data = [

			[
				'account_id'       => $accountId,
				'private_key'      => 'b227',
				'public_key'       	=> 'b228',
				'helpdesk' => 'helpscout',
				'helpdesk_settings' => [
					'helpscout' => $helpscout_data
				]
			],
			[
				'account_id'       => $accountId2,
				'private_key'      => 'aab227',
				'public_key'       	=> 'ab228',

			]
		];

		$settings = new SettingsApi($data);

		$settings->save();
		$this->assertNotEmpty(
			did_action('trustedlogin_vendor_settings_saved')
		);
		$settings = SettingsApi::fromSaved();

		$setting1 = $settings->getByAccountId($accountId);
		//Team we saved helpscout data for has helpscout data
		$this->assertSame(
			$helpscout_data,
			$setting1
			->getHelpdeskData()
		);
		$this->assertArrayHasKey(
			TeamSettings::HELPDESK_SETTINGS,
			$setting1->toArray()
		);

		$this->assertSame(
			$helpscout_data,
			SettingsApi::fromSaved()->getByAccountId($accountId)
			->getHelpdeskData()
		);

		$this->assertSame(
			'b227',
			$settings->getByAccountId($accountId)
				->get('private_key')
		);



		//Team we didn't provide any helpdesk settings for.
		// Did it  save helpscout data?
		$helpscout_data = $settings->getByAccountId($accountId2)
			->getHelpdeskData();

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
			SettingsApi::fromSaved()->getByAccountId($accountId2)
			->getHelpdeskData()
		);

		update_option(SettingsApi::TEAM_SETTING_NAME, false);
	}

	/**
	 *
	 * @covers SettingsApi::hasSetting()
	 */
	public function test_settings_collection_hasSetting()
	{
		$data = [
			[
				'account_id'       => '216',
				'private_key'      => '217',
				'public_key'       	=> '218',
			],
			[
				'account_id'       => '126',
				'private_key'      => '227',
				'public_key'       	=> '228',
			]
		];
		$settings = new SettingsApi($data);

		$this->assertTrue(
			$settings->hasSetting('216')
		);
		$this->assertTrue(
			$settings->hasSetting('126')
		);
		$this->assertFalse(
			$settings->hasSetting('zzzz')
		);
	}


	/**
	 *
	 * @covers SettingsApi::addSetting()
	 * @covers SettingsApi::getByAccountId()
	 */
	public function test_addSetting_to_api()
	{
		$data = [
			[
				'account_id'       => '2216',
				'private_key'      => 'a217',
				'public_key'       	=> 'a218',
			],
			[
				'account_id'       => '126',
				'private_key'      => 'b227',
				'public_key'       	=> 'b228',
			]
		];
		$settings = new SettingsApi($data);
		$setting = new TeamSettings([
			'account_id'       => '1126',
			'private_key'      => 'pkt',
			'public_key'       	=> 'ab228',
		]);

		$settings->addSetting(
			$setting
		);
		//Has new one.
		$this->assertTrue(
			$settings->hasSetting('1126')
		);
		//Still has old one
		$this->assertTrue(
			$settings->hasSetting('126')
		);
		//Can also update
		$setting->set('private_key', 'pk9000');
		$settings->addSetting(
			$setting
		);
		$this->assertSame(
			'pk9000',
			$settings->getByAccountId(
				'1126'
			)->get(( 'private_key'))
		);
	}

	/**
	 * @covers SettingsApi::addSetting()
	 * @covers SettingsApi::count()
	 */
	public function testCount(){
		$data = [
			[
				'account_id'       => '2216',
				'private_key'      => 'a217',
				'public_key'       	=> 'a218',
			],
			[
				'account_id'       => '126',
				'private_key'      => 'b227',
				'public_key'       	=> 'b228',
			]
		];
		$settings = new SettingsApi([]);
		$this->assertSame(0, $settings->count());
		$settings = new SettingsApi($data);
		$this->assertSame(2, $settings->count());
	}
}
