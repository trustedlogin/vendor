<?php

namespace TrustedLogin\Vendor\Webhooks;

use TrustedLogin\Vendor\TeamSettings;
use TrustedLogin\Vendor\AccessKeyLogin;

class Factory {


    public static function webhook( TeamSettings $teamSettings ){

        $type = $teamSettings->get_helpdesks()[0];
        switch($type)
        {
            case 'helpscout':
                return new HelpScout( $teamSettings->get_helpdesk_data()['secret'] );
            default:
                throw new \Exception( 'Unknown webhook type' );
        }
    }

    /**
	 * Builds a URL for helpdesk request and redirect actions.
	 *
	 * @since 1.0.0
	 *
	 * @param string $action What action the link should do. eg 'support_redirect'.
	 * @param string $account_id What account ID link is for.
     * @param string $provider Slug of helpdesk
	 * @param string $access_key (Optional) The key for the access being requested.
	 *
	 * @return string|\WP_Error The url with GET variables.
	 */
	public static function actionUrl( $action, $account_id,$provider, $access_key = '' ) {

		if ( empty( $action ) ) {
			return new \WP_Error( 'variable-missing', 'Cannot build helpdesk action URL without a specified action' );
		}

		$args = [
			AccessKeyLogin::REDIRECT_ENDPOINT  => true,
			'action'   => $action,
			'provider' => $provider,
			AccessKeyLogin::ACCOUNT_ID_INPUT_NAME  => $account_id,
        ];

		if ( $access_key ) {
			$args['ak'] = $access_key;
		}
        foreach ($args as $key => $value) {
            $args[$key] = urlencode($value);
        }

		$url = add_query_arg( $args, site_url() );
		return esc_url_raw( $url );
	}
}