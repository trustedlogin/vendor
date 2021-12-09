<?php
namespace TrustedLogin\Vendor\Tests;

use TrustedLogin\Vendor\Endpoints\Settings;
use TrustedLogin\Vendor\SettingsApi;
use TrustedLogin\Vendor\ApiSend;
use TrustedLogin\Vendor\Contracts\SendsApiRequests;

trait MocksTLApi {

    /**
     * Set up mock API for TrustedLogin eCommerce
     */
    protected function setTlApiMock(){

        $sender = new class implements SendsApiRequests {
			public $method;
            public $nextResponse;
            /**
             * The data for get envelope response
             * @return string
             */
            protected  function getEnvelopeData(){
                return file_get_contents(__DIR__ . '/data/get-envelope.json');
            }

			public function send( $url, $data, $method, $additional_headers ){
                $strEndsWith = function ($string, $search) {
                    if( function_exists('str_ends_with')){
                        return str_ends_with($string, $search);
                    }
                    $len = strlen($search);
                    if ($len == 0) {
                        return true;
                    }
                    return (substr($string, -$len) === $search);
                };
                //Mock get envelope
                if( $strEndsWith (
                    $url,
                    '/get-envelope',
                )){
                    $json = $this->getEnvelopeData();
                    return [
                        'body' => $json
                    ];
                }
                //Mock
                if( $strEndsWith(
                    str_replace(\trustedlogin_vendor()->getApiUrl(),'', $url),
                    '/sites/'
                )){
                    $json = file_get_contents(__DIR__ . '/data/sites-200.json');
                    return [
                        'body' => $json
                    ];
                }

			}
		};
        trustedlogin_vendor()->setApiSender(
			$sender
		);
    }

    /**
     * The data for get envelope response
     * @return string
     */
    protected  function getEnvelopeData(){
        return file_get_contents(__DIR__ . '/data/get-envelope.json');
    }

    /**
     * Resets mock API for TrustedLogin eCommerce
     */
    protected function resetTlApiMock(){
        trustedlogin_vendor()->setApiSender(
            new ApiSend()
        );
    }

        /**
     * Get the vendor encryption keys for testing with.
     */
    protected function getEncryptionKeys(){
        if( ! isset($_ENV['TL_VENDOR_ENCRYTPTION_KEY'])){
            throw new \Exception( 'TL_VENDOR_ENCRYTPTION_KEY is not an env var');
        }
        try {
            return json_decode($_ENV['TL_VENDOR_ENCRYTPTION_KEY']);
        } catch (\Throwable $th) {
            throw $th;
        }

    }
}
