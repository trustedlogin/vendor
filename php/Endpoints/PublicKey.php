<?php
namespace TrustedLogin\Vendor\Endpoints;

use TrustedLogin\Vendor\SettingsApi;

use TrustedLogin\Vendor\Encryption;
class PublicKey extends Endpoint {



    protected function route(){
        return 'public_key';
    }


    public function get(\WP_REST_Request $request){
        $trustedlogin_encryption = new Encryption();
		$public_key              = $trustedlogin_encryption->get_public_key();

		$response = new \WP_REST_Response();

		if ( ! is_wp_error( $public_key ) ) {
			$data = array(
				'publicKey' => $public_key,
			);
			$response->set_data( $data );
			$response->set_status( self::PUBLIC_KEY_SUCCESS_STATUS );
		} else {
			$response->set_status( self::PUBLIC_KEY_ERROR_STATUS );
		}

		return $response;
    }



}
