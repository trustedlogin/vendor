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
                    $json = file_get_contents(__DIR__ . '/data/get-envelope.json');
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
     * Resets mock API for TrustedLogin eCommerce
     */
    protected function resetTlApiMock(){
        trustedlogin_vendor()->setApiSender(
            new ApiSend()
        );
    }
}
