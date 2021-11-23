<?php

namespace TrustedLogin\Vendor\Tests;


use TrustedLogin\Vendor\Encryption;
use TrustedLogin\Vendor\AccessKeyLogin;

class AccesKeyLoginTest extends \WP_UnitTestCase {

    public  function testVerifyRequest(){
        $ak = new AccessKeyLogin();
        //Check for no_access_key error
        $this->assertTrue(
            is_wp_error(
                $ak->verify_grant_access_request()
            )
        );
        $this->assertArrayHasKey(
            'no_access_key',
            $ak->verify_grant_access_request()->errors
        );
        //Set access key
        $_REQUEST[ AccessKeyLogin::ACCESS_KEY_INPUT_NAME ] ='something';
        //Check for no no_account_id error
        $this->assertTrue(
            is_wp_error(
                $ak->verify_grant_access_request()
            )
        );
        $this->assertArrayHasKey(
            'no_account_id',
            $ak->verify_grant_access_request()->errors
        );
        //Set account id
        $_REQUEST[AccessKeyLogin::ACCOUNT_ID_INPUT_NAME ] = 'whatever';
        //Check for no no_nonce
        $this->assertTrue(
            is_wp_error(
                $ak->verify_grant_access_request()
            )
        );
        $this->assertArrayHasKey(
            'no_nonce',
            $ak->verify_grant_access_request()->errors
        );


        //Set invalid nonce
        $_REQUEST[AccessKeyLogin::NONCE_NAME ] = wp_create_nonce('bad-action');
        //Check for no no_referrer
        $this->assertTrue(
            is_wp_error(
                $ak->verify_grant_access_request()
            )
        );
        $this->assertArrayHasKey(
            'no_referrer',
            $ak->verify_grant_access_request()->errors
        );
        ///set _wp_http_referer
        $_REQUEST['_wp_http_referer'] = 'https://something.com';

        //Return false, not error
        $this->assertFalse(
            $ak->verify_grant_access_request()
        );

        //Set valid nonce
        $_REQUEST[AccessKeyLogin::NONCE_NAME ] = wp_create_nonce(AccessKeyLogin::NONCE_ACTION);

        $this->assertTrue(
            $ak->verify_grant_access_request()
        );
    }
}
