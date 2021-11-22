<?php

namespace TrustedLogin\Vendor;

class Plugin
{
    /**
     * @var Encryption $encryption
     */
    protected Encryption $encryption;


    /**
     * @param Encryption $encryption
     */
    public function __construct(Encryption $encryption){
        $this->encryption = $encryption;
    }

    /**
     * Add REST API endpoints
     *
     * @uses "rest_api_init" action
     */
    public function restApiInit(){
        (new \TrustedLogin\Vendor\Endpoints\Settings())
            ->register();
        (new \TrustedLogin\Vendor\Endpoints\PublicKey())
            ->register();
        (new \TrustedLogin\Vendor\Endpoints\SignatureKey())
            ->register();
    }

    /**
     * Get the encyption public key
     *
     * @return string
     */
    public function getPublicKey(){
        return $this->encryption
            ->get_public_key();
    }

    /**
     * Get the encyption signature key
     *
     * @return string
     */
    public function getSignatureKey(){
        return $this->encryption
            ->get_public_key( 'sign_public_key' );
    }


    public function getApiHandler($account,$apiUrl = 'https://app.trustedlogin.com/api/v1/'){
        $settings = \TrustedLogin\Vendor\SettingsApi::from_saved()->get_by_account_id($account);
        return new ApiHandler([
            'private_key' => $settings->get( 'private_key'),
		    'api_key'  => $settings->get( 'api_key'),
		    'debug_mode'  => $settings->get( 'debug_enabled'),
		    'type'        => 'saas',
            'api_url' => $apiUrl
        ]);
    }


}
