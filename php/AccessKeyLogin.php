<?php
namespace TrustedLogin\Vendor;

use TrustedLogin\Vendor\Traits\VerifyUser;
use TrustedLogin\Vendor\Traits\Logger;

/**
 * Handler for access key login
 */
class AccessKeyLogin
{

	use Logger,VerifyUser;

	/**
	 * WordPress admin slug for access key login
	 */
	const PAGE_SLUG = 'trustedlogin_access_key';

	/**
	 * Name of form nonce
	 */
	const NONCE_NAME = '_tl_ak_nonce';

	/**
	 * Name of form nonce action
	 */
	const NONCE_ACTION = 'ak-redirect';

	/**
	 * Query param for redirect URL, to indicate it is a key login
	 */
	const ACCESS_KEY_ACTION_NAME = 'tl_access_key_login';

	/**
	 * Query param for redirect URL, to indicate account ID
	 */
	const ACCOUNT_ID_INPUT_NAME = 'ak_account_id';

	const ACCESS_KEY_INPUT_NAME = 'ak';

	const REDIRECT_ENDPOINT = 'trustedlogin';


	/**
	 * The URL for access key login
	 *
	 *  @return string
	 */
	public static function url($account_id){
		return add_query_arg([
			'action' => self::ACCESS_KEY_ACTION_NAME,
			self::ACCOUNT_ID_INPUT_NAME => $account_id,
		], site_url());
	}

	public static function makeSecret(){
		return bin2hex(random_bytes(8));
	}
	/**
	 * Processes the request.
	 *
	 * Sends JSON responses.
	 *
	 */
	public function handle()
	{

		$verified = $this->verify_grant_access_request();

		if (! $verified || is_wp_error($verified)) {
			trustedlogin_vendor_send_json_error($verified);
		}

		$access_key = sanitize_text_field($_REQUEST[ self::ACCESS_KEY_INPUT_NAME ]);
		$account_id = sanitize_text_field($_REQUEST[ self::ACCOUNT_ID_INPUT_NAME]);
		//Get saved settings an then team settings
		$settings = SettingsApi::from_saved();
		try {
			$teamSettings =  $settings->get_by_account_id($account_id);
		} catch (\Exception $e) {
			// Print error
			trustedlogin_vendor_send_json_error(esc_html__($e->getMessage()), 404);
			exit;
		}
		if ($this->verifyUserRole($teamSettings)) {
			// Print error
			trustedlogin_vendor_send_json_error(esc_html__($e->getMessage(), 403));
			exit;
		}

		$tl = new TrustedLoginService(
			trustedlogin_vendor()
		);

		$site_ids = $tl->api_get_secret_ids($access_key, $account_id);
		if (is_wp_error($site_ids)) {
			trustedlogin_vendor_send_json_error($site_ids);
		}

		if (empty($site_ids)) {
			trustedlogin_vendor_send_json_error(esc_html__('No sites were found matching the access key.', 'trustedlogin-vendor'), 404);
		}

		/**
		 * TODO: Add handling for multiple siteIds
		 * @see  https://github.com/trustedlogin/trustedlogin-vendor/issues/47
		 */
		$envelope = $tl->api_get_envelope($site_ids[0], $account_id);
		// Print error
		if (is_wp_error($envelope)) {
			trustedlogin_vendor_send_json_error($envelope);
		}

		$parts = $tl->envelope_to_url($envelope, true);
		if (is_wp_error($parts)) {
			trustedlogin_vendor_send_json_error($parts);
		}

		trustedlogin_vendor_send_json($parts);
	}

	/**
	 * Verifies the $_POST request by the Access Key login form.
	 *
	 * @return bool|WP_Error
	 */
	public function verify_grant_access_request()
	{

		if (empty($_REQUEST[ self::ACCESS_KEY_INPUT_NAME ])) {
			$this->log('No access key sent.', __METHOD__, 'error');
			return new \WP_Error('no_access_key', esc_html__('No access key was sent with the request.', 'trustedlogin-vendor'));
		}

		if (empty($_REQUEST[self::ACCOUNT_ID_INPUT_NAME ])) {
			$this->log('No account id  sent.', __METHOD__, 'error');
			return new \WP_Error('no_account_id', esc_html__('No account id was sent with the request.', 'trustedlogin-vendor'));
		}

		if (empty($_REQUEST[ self::NONCE_NAME ])) {
			$this->log('No nonce set. Insecure request.', __METHOD__, 'error');
			return new \WP_Error('no_nonce', esc_html__('No nonce was sent with the request.', 'trustedlogin-vendor'));
		}

		if (empty($_REQUEST['_wp_http_referer'])) {
			$this->log('No referrer set; could be insecure request.', __METHOD__, 'error');
			return new \WP_Error('no_referrer', esc_html__('The referrer was not set for the request.', 'trustedlogin-vendor'));
		}

		// Referred from same screen?
		if (admin_url('admin.php?page=' . self::PAGE_SLUG) !== site_url(wp_get_raw_referer())) {
			//$this->log( 'Referrer does not match; could be insecure request.',__METHOD__, 'error' );
			//return new WP_Error('no_access_key', esc_html__( 'The referrer does not match the expected source of the request.', 'trustedlogin-vendor' ) );
		}



		// Valid nonce?
		$valid = wp_verify_nonce($_REQUEST[ self::NONCE_NAME ], self::NONCE_ACTION);

		if (! $valid) {
			$this->log('Nonce is invalid; could be insecure request. Refresh the page and try again.', __METHOD__, 'error');
			return false;
		}

		return true;
	}
}
