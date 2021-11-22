<?php

namespace TrustedLogin\Vendor;

class Plugin
{

    protected Encryption $encryption;


    public function __construct(Encryption $encryption){
        $this->encryption = $encryption;
    }

    public function restApiInit(){
        (new \TrustedLogin\Vendor\Endpoints\Settings())
            ->register();
        (new \TrustedLogin\Vendor\Endpoints\PublicKey())
            ->register();
        (new \TrustedLogin\Vendor\Endpoints\SignatureKey())
            ->register();
    }

    public function getPublicKey(){
        return $this->encryption
            ->get_public_key();
    }

    public function getSignatureKey(){
        return $this->encryption
            ->get_public_key( 'sign_public_key' );
    }
}
