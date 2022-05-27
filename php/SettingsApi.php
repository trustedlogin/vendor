<?php


namespace TrustedLogin\Vendor;

use TrustedLogin\Vendor\Status\IsTeamConnected;
use TrustedLogin\Vendor\Webhooks\Helpscout;

/**
 * Responsible for all read/write of settings plugin uses for teams.
 *
 * Encryption class doesn't follow this rule BTW, but you should.
 */
class SettingsApi
{

	/**
	 * The name of the option we store team settings in.
	 */
	const TEAM_SETTING_NAME = 'trustedlogin_vendor_team_settings';

	/**
	 * The name of the option we store team settings in.
	 */
	const GLOBAL_SETTING_NAME = 'trustedlogin_vendor_other_settings';

	/**
	 * The name of the option we store log hash in.
	 * @see Traits/Logger
	 */
	const LOG_LOCATION_SETTING_NAME = 'trustedlogin_vendor_log_location';
	/**
	 * @var TeamSettings[]
	 */
	protected $teamSettings = [];

	/**
	 * @var []
	 */
	protected $globalSettings;

	/**
	 * @var []
	 */
	protected $globalSettingsDefaults = [
		'integrations' => [
			'helpscout' => [
				'enabled' => true,
			]
		],
	];

	/**
	 * @param TeamSettings[]|array[] $teamData Collection of team data
	 */
	public function __construct(array $team_data,array $globaSlettings = [])
	{

		$this->setGlobalSettings($globaSlettings);
		foreach ($team_data as $values) {
			if (is_array($values)) {
				$values = new TeamSettings($values);
			}
			if (is_a($values, TeamSettings::class)) {
				$this->teamSettings[] = $values;
			}
		}
	}

	/**
	 * Create instance from saved data.
	 * @return SettingsApi
	 */
	public static function fromSaved()
	{

		$saved = get_option(self::TEAM_SETTING_NAME, []);

		$data = [];
		if (! empty($saved)) {
			$saved = (array)json_decode($saved);
			foreach ($saved as $value) {
				$team = new TeamSettings((array)$value);
				$data[] = $team;
			}
		}
		$obj = new static($data);
		$globals = get_option(self::GLOBAL_SETTING_NAME, null);
		if (! empty($globals)) {
			$globals = (array)json_decode($globals);

			$obj->setGlobalSettings(
				is_array($globals) ? $globals : []

			 );
		}


		return $obj;
	}

	/**
	 * Save data
	 *
	 * @since 0.10.0
	 * @return SettingsApi
	 */
	public function save()
	{
		$data = [];
		foreach ($this->teamSettings as $setting) {
			$_setting = $setting->toArray();
			//If enabled a helpdesk...
			if( ! empty( $setting->getHelpdesks() ) ) {
				if( ! isset($_setting[TeamSettings::HELPDESK_SETTINGS]) ) {
					$_setting[TeamSettings::HELPDESK_SETTINGS] = [];
				}
				$account_id = $setting->get( 'account_id');
				foreach( $setting->getHelpdesks() as $helpdesk){
					if( isset( $_setting[TeamSettings::HELPDESK_SETTINGS][$helpdesk])){
						continue;
					}
					$_setting[TeamSettings::HELPDESK_SETTINGS][$helpdesk] = $this->newHelpdeskSettings($account_id,$helpdesk);
				}

			}
			$data[] = $_setting;
		}

		update_option(self::TEAM_SETTING_NAME, json_encode($data));
		update_option(self::GLOBAL_SETTING_NAME,json_encode( $this->getGlobalSettings()));
		$count = self::count();

		/**
		 * Fires after settings are saved.
		 */
		do_action( 'trustedlogin_vendor_settings_saved', $count );

		//When saving settings, maybe mark onboarding complete
		if( $count ){
			\TrustedLogin\Vendor\Status\Onboarding::setHasOnboarded();
		}

		return $this;
	}

	/**
	 * Get team setting, by id
	 *
	 * @since 0.10.0
	 * @param string|int $account_id Account to search for
	 * @return TeamSettings
	 */
	public function getByAccountId($account_id)
	{
		foreach ($this->teamSettings as $setting) {
			if (intval($account_id) === intval($setting->get('account_id'))) {
				return $setting;
			}
		}

		throw new \Exception($account_id. ' Not found');
	}

	/*
	 * Update team setting
	 *
	 * @since 0.10.0
	 * @param TeamSettings $values New settings object
	 * @return SettingsApi
	 */
	public function updateByAccountId(TeamSettings $value)
	{
		foreach ($this->teamSettings as $key => $setting) {
			if ($value->get('account_id') == $setting->get('account_id')) {
				$this->teamSettings[$key] = $value;
				return $this;
			}
		}
		throw new \Exception('Canot save, Account not found');
	}

	/**
	 * Check if setting is in collection
	 * @since 0.10.0
	 * @param string $account_id
	 * @return bool
	 */
	public function hasSetting($account_id)
	{
		foreach ($this->teamSettings as $setting) {
			if ($account_id == $setting->get('account_id')) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Add or update a setting to collection
	 * @since 0.10.0
	 * @param TeamSetting $setting
	 * @return $this
	 */
	public function addSetting(TeamSettings $setting)
	{
		//If we have it already, update
		if ($this->hasSetting($setting->get('account_id'))) {
			$this->updateByAccountId($setting);
			return $this;
		}
		//add it to collection
		$this->teamSettings[] = $setting;
		return $this;
	}

	/**
	 * Get count of settings
	 *
	 * @return int
	 */
	public function count(){
		return isset($this->teamSettings) ? count($this->teamSettings): 0;
	}

	/**
	* Reset all teams and maybe global settings

	* @param bool $resetGeneralSettings
	* @since 0.10.0
	* @return $this
	*/
	public function reset($resetGeneralSettings = false )
	{
		$this->teamSettings = [];
		if( $resetGeneralSettings ){
			$this->globalSettings = $this->globalSettingsDefaults;
		}
		return $this;
	}

	/**
	 * Convert to array of arrays
	 *
	 * @since 0.10.0
	 * @return array
	 */
	public function toArray()
	{

		return [
			'teams' => $this->allTeams(true),
			'integrations' => $this->getIntegrationSettings(),
		];
	}


	/**
	 * Get all Teams as an array
	 *
	 * @since 0.10.0
	 * @param bool $as_array If true, teams are converted to array.
	 * @return array
	 */
	public function allTeams($as_array = false){
		$data = [];
		foreach ($this->teamSettings as $setting) {
			if( $as_array ){
				$data[] = $setting->toArray();
			}else{
				$data[] = $setting;
			}
		}
		return $data;
	}

	/**
	 * Get the settings, as used by API and UI
	 *
	 * @return array
	 */
	public function toResponseData(){
		$data = $this->toArray();
		$teams = $data['teams'] ?? [];

		foreach ($teams as $i => $team) {

			$teams[$i][IsTeamConnected::KEY] = IsTeamConnected::valueToBoolean(
				isset($team[IsTeamConnected::KEY]) ? $team[IsTeamConnected::KEY] : null
			);
		}
		$data['teams'] = $teams;
		return array_merge(
			$data,
			[
				'integrations' => $this->getIntegrationSettings(),
			]
		);
	}

	/**
	 * Get integration settings
	 *
	 * @since 0.10.0
	 * @return array
	 */
	public function getIntegrationSettings(){
		$settings = isset($this->globalSettings['integrations']) ? $this->globalSettings['integrations'] : [];
		return $settings;
	}


	/**
	 * Get the global settings
	 */
	public function getGlobalSettings()
	{
		return $this->globalSettings;
	}

	/**
	 * Set the global settings
	 *
	 * Values will be merged with existin
	 *
	 * @param array $globalSettings
	 * @return $this
	 */
	public function setGlobalSettings(array $globalSettings)
	{

		//When resetting from saved, deal with json_decode not being recursive for array conversion
		if( isset($globalSettings['integrations'])&& is_object($globalSettings['integrations'])){
			$globalSettings['integrations'] = (array)$globalSettings['integrations'];
			foreach ($globalSettings['integrations'] as $i => $value) {
				$globalSettings['integrations'][$i] = (array)$value;
			}
		}
		$this->globalSettings = wp_parse_args(
			$globalSettings,
			! empty($this->globalSettings)? $this->globalSettings : $this->globalSettingsDefaults
		);
		return $this;
	}

	/**
	 * Reset Helpdesk settings for one account
	 *
	 * @param string $accountId
	 * @param string $helpdesk
	 * @return TeamSettings
	 */
	public function resetHelpdeskSettings($accountId,$helpdesk){
		$team = $this->getByAccountId($accountId);
		$settings = $this->newHelpdeskSettings($accountId,$helpdesk);
		$team->set(TeamSettings::HELPDESK_SETTINGS,
			array_merge(
				$team->get(TeamSettings::HELPDESK_SETTINGS, []),
				[ $helpdesk => $settings ]
			)
		);
		$this->save();
		return $this;
	}

	protected function newHelpdeskSettings($accountId,$helpdesk){
		return [
			'secret' => AccessKeyLogin::makeSecret( $accountId ),
			'callback' => Helpscout::actionUrl( $accountId,$helpdesk )
		];
	}
}
