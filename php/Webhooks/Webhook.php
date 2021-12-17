<?php

namespace TrustedLogin\Vendor\Webhooks;
use TrustedLogin\Vendor\AccessKeyLogin;
use TrustedLogin\Vendor\Traits\Licensing;
use TrustedLogin\Vendor\Traits\Logger;

abstract class Webhook {

    use Licensing,Logger;
    /**
     * @var string
     */
    protected $secret;

	public function __construct(string $secret )
    {
        $this->secret = $secret;
    }


    public function make_signature(string $data){
        return base64_encode( hash_hmac( 'sha1', $data, $this->secret, true ) );
    }

    /**
	 * Builds a URL for helpdesk request and redirect actions.
	 *
	 * @since 1.0.0
	 *
	 * @param string $action What action the link should do. eg 'support_redirect'.
	 * @param string $access_key (Optional) The key for the access being requested.
	 *
	 * @return string|\WP_Error The url with GET variables.
	 */
	public function build_action_url( $action, $access_key = '' ) {

		if ( empty( $action ) ) {
			return new \WP_Error( 'variable-missing', 'Cannot build helpdesk action URL without a specified action' );
		}

		$endpoint = AccessKeyLogin::REDIRECT_ENDPOINT;

		$args = [
			$endpoint  => 1,
			'action'   => $action,
			'provider' => $this->get_slug(),
        ];

		if ( $access_key ) {
			$args['ak'] = $access_key;
		}

		$url = add_query_arg( $args, site_url() );

		return esc_url( $url );
	}

    /**
     * Get slug for this webhook.
     *
     * @return string
     */
    abstract protected function get_slug();

    /**
	 * Generates the HTML output for the webhook.
	 *
	 * @param array|null $data The data sent to the webhook. If null, php://input is used
	 *
	 * @return void Sends JSON response back to an Ajax request via wp_send_json()
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
        if( $this->is_edd_store()) {
		foreach ( $customer_emails as $customer_email ) {
                $email = sanitize_email( $customer_email );

                $_licenses_for_email = get_transient( 'trustedlogin_licenses_edd' . md5( $email ) );

                if ( false === $_licenses_for_email ) {
                    $_licenses_for_email = $this->edd_get_licenses( $email );
                }

                if ( ! empty( $_licenses_for_email ) ) {

                    set_transient( 'trustedlogin_licenses_edd' . md5( $email ), $_licenses_for_email, DAY_IN_SECONDS );

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
