<?php

namespace TrustedLogin\Vendor\Webhooks;
use TrustedLogin\Vendor\AccessKeyLogin;
use TrustedLogin\Vendor\Traits\Licensing;
use TrustedLogin\Vendor\Traits\Logger;

abstract class Webhook {

    use Licensing,Logger;

	const WEBHOOK_ACTION = 'trusted_login_webhook';

    /**
     * @var string
     */
    protected $secret;

	public function __construct(string $secret )
    {
        $this->secret = $secret;
    }

	/**
	 * Calculate signature from request data
	 *
	 * @param string $data JSON encoded data
	 * @return bool
	 */
    public function make_signature(string $data){
        return base64_encode( hash_hmac( 'sha1', $data, $this->secret, true ) );
    }

    /**
	 * Builds a URL for helpdesk request and redirect actions.
	 *
	 * @since 1.0.0
	 *
	 * @param string $account_id What account ID link is for.
	 *
	 * @return string|\WP_Error The url with GET variables.
	 */
	public function action_url( $account_id ) {


		$endpoint = AccessKeyLogin::REDIRECT_ENDPOINT;

		$args = [
			$endpoint  => '1',
			'action'   => self::WEBHOOK_ACTION,
			'provider' => $this->get_provider_name(),
			AccessKeyLogin::ACCOUNT_ID_INPUT_NAME  => $account_id,
        ];

		$url = add_query_arg( $args, site_url() );

		return esc_url( $url );
	}

    /**
     * Get provider name for this webhook.
     *
     * @return string
     */
    abstract protected function get_provider_name();

    /**
	 * Generates the HTML output for the webhook.
	 *
	 * @param array|null $data The data sent to the webhook. If null, php://input is used
	 *
	 * @return array
	 */
    abstract public function webhook_endpoint($data = null );


    /**
	 * Returns license keys associated with customer email addresses.
	 *	 *
	 * @param array $customer_emails Array of email addresses Help Scout associates with the customer.
	 *
	 * @return array Array of license keys associated with the passed emails.
	 */
	protected function get_licenses_by_emails( $customer_emails ) {

        $licenses = [];
        if( $this->is_edd_store() && $this->edd_has_licensing()) {
			foreach ( $customer_emails as $customer_email ) {
                $email = sanitize_email( $customer_email );
				$cache_key ='trustedlogin_licenses_edd' . md5( $email );
				$cache_group = 'trustedlogin_edd';
                $_licenses_for_email = wp_cache_get( $cache_key, $cache_group  );

                if ( false === $_licenses_for_email ) {
                    $_licenses_for_email = $this->edd_get_licenses( $email );
                }

                if ( ! empty( $_licenses_for_email ) ) {

                    wp_cache_set( $cache_key, $_licenses_for_email,$cache_group, DAY_IN_SECONDS );

                    $licenses = array_merge( $licenses, $_licenses_for_email );
                }
            }
        }
		/**
		 * Filter: allow for other addons to generate the licenses array
		 *
		 * @since 0.6.0
		 *
		 * @param \EDD_SL_License[]|false $licenses
		 * @param string $email
		 *
		 * @return array
		 */
		return apply_filters( 'trustedlogin/vendor/customers/licenses', $licenses, $customer_emails );
    }
}
