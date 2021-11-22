<?php
namespace TrustedLogin\Vendor;
use TrustedLogin\Vendor\Traits\Logger;
/**
 * Checks for support redirect logins and tries to handle them.
 */
class MaybeRedirect {

    use Logger;
    /**
	 * Checks if the specified attributes are set has a valid access_key before checking if we can redirect support agent.
	 *
     * @uses "template_redirect" action
	 * @since 1.0.0
	 */
	public function handle() {

		if ( ! isset( $_REQUEST[ AccessKeyLogin::REDIRECT_ENDPOINT ] ) ) {
			return;
		}

		if ( 1 !== intval( $_REQUEST[ AccessKeyLogin::REDIRECT_ENDPOINT ] ) ) {
			$this->log(
				'Incorrect parameter for TrustedLogin provided: ' . sanitize_text_field( $_REQUEST[ self::REDIRECT_ENDPOINT ] ),
				__METHOD__,
				'error'
			);

			return;
		}

		$required_args = array(
			'action',
			'provider',
			AccessKeyLogin::ACCESS_KEY_INPUT_NAME,
            AccessKeyLogin::ACCOUNT_ID_INPUT_NAME,
		);


		foreach ( $required_args as $required_arg ) {
			if ( ! isset( $_REQUEST[ $required_arg ] ) ) {
				$this->log( 'Required arg ' . $required_arg . ' missing.', __METHOD__, 'error' );
				return;
			}
		}

        $account_id = sanitize_text_field( $_REQUEST[ AccessKeyLogin::ACCOUNT_ID_INPUT_NAME ] );


		if ( isset( $_REQUEST['provider'] ) ) {
			$active_helpdesk = 'helpscout';

			if ( $active_helpdesk !== $_REQUEST['provider'] ) {
				$this->log( 'Active helpdesk doesn\'t match passed provider. Helpdesk: ' . esc_attr( $active_helpdesk ) . ', Provider: ' . esc_attr( $_REQUEST['provider'] ), __METHOD__, 'warning' );

				return;
			}
		}

        $tl = new TrustedLoginService();

		switch ( $_REQUEST['action'] ) {
			case 'accesskey_login':

				if ( ! isset( $_REQUEST[ ACCESS_KEY_INPUT_NAME::ACCESS_KEY_INPUT_NAME ] ) ) {
					$this->log( 'Required arg `' . ACCESS_KEY_INPUT_NAME::ACCESS_KEY_INPUT_NAME . '` missing.', __METHOD__, 'error' );

					return;
				}

				$access_key = sanitize_text_field( $_REQUEST[ ACCESS_KEY_INPUT_NAME::ACCESS_KEY_INPUT_NAME ] );
				$secret_ids = $tl->api_get_secret_ids( $access_key,$account_id );

				if ( is_wp_error( $secret_ids ) ) {
					$this->log(
						'Could not get secret ids. ' . $secret_ids->get_error_message(),
						__METHOD__,
						'error'
					);

					return;
				}

				if ( empty( $secret_ids ) ) {
					$this->log(
						sprintf( 'No secret ids returned for access_key (%s).', $access_key ),
						__METHOD__,
						'error'
					);

					return;
				}

				if ( 1 === count( $secret_ids ) ) {
					$tl->maybe_redirect_support( $secret_ids[0] );
				}

				$tl->handle_multiple_secret_ids( $secret_ids,$account_id );

				break;

			case 'support_redirect':

				if ( ! isset( $_REQUEST[ ACCESS_KEY_INPUT_NAME::ACCESS_KEY_INPUT_NAME ] ) ) {
					$this->log( 'Required arg ' . ACCESS_KEY_INPUT_NAME::ACCESS_KEY_INPUT_NAME . ' missing.', __METHOD__, 'error' );

					return;
				}

				$secret_id = sanitize_text_field( $_REQUEST[ ACCESS_KEY_INPUT_NAME::ACCESS_KEY_INPUT_NAME ] );

				$tl->maybe_redirect_support( $secret_id,$account_id );

				break;
			default:

		}

		return;
	}
}
