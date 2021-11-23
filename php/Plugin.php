<?php

namespace TrustedLogin\Vendor;
use TrustedLogin\Vendor\Contracts\SendsApiRequests as ApiSend;

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
     * @var ApiSend
     */
    protected $apiSender;

    /**
     * @param Encryption $encryption
     */
    public function __construct(Encryption $encryption){
        $this->encryption = $encryption;
        $this->auditLog = new AuditLog();
        $this->apiSender = new \TrustedLogin\Vendor\ApiSend();
    }



    /**
     * Add REST API endpoints
     *
     * @uses "rest_api_init" action
     */
    public function restApiInit(){
        (new \TrustedLogin\Vendor\Endpoints\Settings())
            ->register(true);
        (new \TrustedLogin\Vendor\Endpoints\PublicKey())
            ->register(false);
        (new \TrustedLogin\Vendor\Endpoints\SignatureKey())
            ->register(false);
    }

    /**
     * Get the encryption API
     *
     * @return Encryption
     */
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
        ],$this->apiSender);
    }

    /**
     * @return \TrustedLogin\Vendor\AuditLog
     */
    public function getAuditLog(){
        return $this->auditLog;
    }

    /**
     * Set the apiSender instance
     *
     * @param ApiSend $apiSender
     * @return $this
     */
    public function setApiSender(ApiSend $apiSender ) {
        $this->apiSender = $apiSender;
        return $this;
    }




}
