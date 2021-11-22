<?php

namespace TrustedLogin\Vendor;
class Plugin
{
    /**
     * @var Encryption
     */
    protected $encryption;

    /**
     * @var AuditLog
     */
    protected $auditLog;
    /**
     * @param Encryption $encryption
     */
    public function __construct(Encryption $encryption){
        $this->encryption = $encryption;
        $this->auditLog = new AuditLog();
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

    public function getEncryption(){
        return $this->encryption;
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


    /**
     * Get API Handler by account id
     *
     * @param string $accountId Account ID, which must be saved in settings, to get handler for.
     * @param string $apiUrl Optional. Url for Trusted Login API.
     */
    public function getApiHandler($accountId,$apiUrl = ''){
        $settings = \TrustedLogin\Vendor\SettingsApi::from_saved()->get_by_account_id($accountId);
        if( empty($apiUrl) ){
            $apiUrl = TRUSTEDLOGIN_API_URL;
        }
        return new ApiHandler([
            'private_key' => $settings->get( 'private_key'),
		    'api_key'  => $settings->get( 'api_key'),
		    'debug_mode'  => $settings->get( 'debug_enabled'),
		    'type'        => 'saas',
            'api_url' => $apiUrl
        ]);
    }

    /**
     * @return \TrustedLogin\Vendor\AuditLog
     */
    public function getAuditLog(){
        return $this->auditLog;
    }


}
