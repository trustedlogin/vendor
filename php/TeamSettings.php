<?php
/**
 * Class: TrustedLogin Team Settings
 *
 * @package trustedlogin-vendor
 * @version 0.10.0
 */

namespace TrustedLogin\Vendor;

/**
 * Object-representation of one Team's settings.
 */
class TeamSettings
{

	/**
	 * @var array
	 * @since 0.10.0
	 */
	protected $defaults = [
		'account_id'       => '',
		'private_key'      => '',
		'api_key'       => '',
		'helpdesk'         => [ 'helpscout' ],
		'approved_roles'   => [ 'administrator' ],
		'debug_enabled'    => 'on',
		'enable_audit_log' => 'on',
		'helpdesk_settings' => [

		]
	];


	/**
	 * @var array
	 * @since 0.10.0
	 */
	protected $values;


	/**
	 * @since 0.10.0
	 *
	 * @param array $values Values to set
	 */
	public function __construct(array $values = [])
	{
		$this->reset($values);
	}

	/**
	 * Get all values as array.
	 *
	 * @since 0.10.0
	 *
	 * @return array
	 */
	public function to_array()
	{
		$data = $this->values;
		//Make sure we have data for helpscout settings
		if( ! empty( $this->values['helpdesk'] ) ) {
			$helpdesks = $this->get_helpdesks($this->values['helpdesk']);
			foreach($helpdesks as $helpdesk){
				if( ! isset( $data['helpdesk_settings'][$helpdesk] ) ) {
					$data['helpdesk_settings'][$helpdesk] = [
						'secret' => hash('sha256', uniqid(rand(), true)),
						'callback' => AccessKeyLogin::url(
							$this->get('account_id'),
						),
					];
				}
			}
		}
		return $data;
	}

	protected function get_helpdesks( $helpdesks = null){
		if( empty( $helpdesks ) ){
			$helpdesks = $this->get('helpdesk');
		}
		if( is_string($helpdesks)){
			$helpdesks = [$helpdesks];
		}
		return $helpdesks;
	}

	/**
	 * Reset all values
	 *
	 * @since 0.10.0
	 *
	 * @param array $values Values to set
	 * @return $this
	 */
	public function reset(array $values)
	{
		$this->values = [];
		foreach ($this->defaults as $key => $default) {
			if (isset($values[$key])) {
				$this->values[$key] = $values[$key];
			} else {
				$this->values[$key] = $default;
			}
		}
		if( isset($values['helpdesk']) && ! empty( $values['helpdesk']) ) {
			$helpdesks = $this->get_helpdesks();
			$settings = [];
			foreach($helpdesks as $helpdesk => $data ){
				$settings[$helpdesk] = is_object($data) ? (array) $data : $data;
			}
			$this->values['helpdesk_settings'] = $settings;
		}
		return $this;
	}

	/**
	 * Set a value
	 *
	 * @since 0.10.0
	 *
	 * @param string $key Setting to set
	 * @param mixed $value The new value
	 * @return $this
	 */
	public function set($key, $value)
	{
		if ($this->valid($key)) {
			$this->values[$key] = $value;
		} else {
			throw new \Exception('Invalid key');
		}
		return $this;
	}

	/**
	 * Get a value
	 *
	 * @since 0.10.0
	 * @param string $key Setting to get
	 * @return mixed
	 */
	public function get($key)
	{
		if ($this->valid($key)) {
			$value = $this->values[$key];
			if( is_object($value)){
				$value = (array)$value;
			}
			return $value;
		}
		throw new \Exception('Invalid key');
	}

	/**
	 * Check if key is valid
	 *
	 * @since 0.10.0
	 * @param string $key Setting to get
	 * @return bool
	 */
	public function valid($key)
	{
		return array_key_exists($key, $this->defaults);
	}

	/**
	 * Get settings for current helpdesk data
	 *
	 * @since 0.10.0
	 * @return array
	 */
	public function get_helpdesk_data()
	{
		$helpdesk = $this->get('helpdesk');
		if( is_array($helpdesk)){
			$helpdesk = $helpdesk[0];
		}
		$key = 'helpdesk_settings';
		if (isset($this->get($key)[$helpdesk])) {
			$data = $this->get($key)[$helpdesk];
			if( is_object($data)){
				$data=(array)$data;
			}
			return [
				'secret' => isset($data['secret']) ?$data['secret'] :"",
				'callback' => isset($data['callback']) ?$data['callback'] :"",
			];
		}

	}
}
