<?php


namespace TrustedLogin\Vendor;


use TrustedLogin\Vendor\Webhooks\Helpscout;

/**
 * Responsible for all read/write of settings plugin uses.
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
	 * @var TeamSettings[]
	 */
	protected $team_settings = [];

	/**
	 * @param TeamSettings[]|array[] $team_data Collection of team data
	 */
	public function __construct(array $team_data)
	{
		foreach ($team_data as $values) {
			if (is_array($values)) {
				$values = new TeamSettings($values);
			}
			if (is_a($values, TeamSettings::class)) {
				$this->team_settings[] = $values;
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

		return new self($data);
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
		foreach ($this->team_settings as $setting) {
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
					$_setting[TeamSettings::HELPDESK_SETTINGS][$helpdesk] = [
						'secret' => AccessKeyLogin::makeSecret( $account_id ),
						'callback' => Helpscout::actionUrl( $account_id,$helpdesk )
					];
				}

			}
			$data[] = $_setting;



		}
		update_option(self::TEAM_SETTING_NAME, json_encode($data));

		/**
		 * Fires after settings are saved.
		 */
		do_action( 'trustedlogin_vendor_settings_saved' );
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
		foreach ($this->team_settings as $setting) {
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
		foreach ($this->team_settings as $key => $setting) {
			if ($value->get('account_id') == $setting->get('account_id')) {
				$this->team_settings[$key] = $value;
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
		foreach ($this->team_settings as $setting) {
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
		$this->team_settings[] = $setting;
		return $this;
	}

	/**
	 * Get count of settings
	 *
	 * @return int
	 */
	public function count(){
		return isset($this->team_settings) ? count($this->team_settings): 0;
	}

	/**
	* Reset all data
	*
	* @since 0.10.0
	* @return $this
	*/
	public function reset()
	{
		$this->team_settings = [];
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
			'teams' => $this->allTeams(true)
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
		foreach ($this->team_settings as $setting) {
			if( $as_array ){
				$data[] = $setting->toArray();
			}else{
				$data[] = $setting;
			}
		}
		return $data;
	}
}
