<?php

namespace TrustedLogin\Vendor;

class Plugin
{

    public function sayHi(): string
    {
        return  'Hi Roy';
    }

    public function restApiInit(){
        (new \TrustedLogin\Vendor\Endpoints\Settings())
            ->register();
    }
}
