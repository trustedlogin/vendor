<?php
//Register assets for TrustedLogin Settings

use TrustedLogin\Vendor\Status\Onboarding;
use TrustedLogin\Vendor\Reset;
use TrustedLogin\Vendor\MenuPage;

add_action('init', function () {
    /**
     * Register assets
     */
    //This needs done once, not once per menu.
    if( file_exists(dirname(__FILE__, 3). "/build/admin-page-trustedlogin-settings.asset.php" ) ){
        $assets = include dirname(__FILE__, 3). "/build/admin-page-trustedlogin-settings.asset.php";
        $dependencies = $assets['dependencies'];
        wp_register_script(
            MenuPage::ASSET_HANDLE,
            plugins_url("/build/admin-page-trustedlogin-settings.js", dirname(__FILE__, 2)),
            $dependencies,
            $assets['version']
        );
        wp_localize_script(MenuPage::ASSET_HANDLE,'tlVendor', [
            'resetAction' => esc_url_raw(Reset::actionUrl()),
            'roles' =>[
                'administrator' => 'Administrator',
                'editor' => 'Editor',
            ],
            'onboarding' => Onboarding::hasOnboarded() ? 'COMPLETE' : '0',
            'accesKeyActions' => trustedlogin_vendor()->getAccessKeyActions(),
        ]);
        wp_register_style(
            MenuPage::ASSET_HANDLE,
            plugins_url("/trustedlogin-dist.css", dirname(__FILE__, 1)),
            [],
            md5_file(dirname(__FILE__, 2)."/trustedlogin-dist.css"),
        );
    }
    /**
     * Add (sub)menu pages
     */
    //Add main menu page
    new MenuPage(
        //Do not pass args, would make it a child page.
    );


    //Add helpdesks submenu page
    new MenuPage(
        MenuPage::SLUG_HELPDESKS,
        __('HelpDesks', 'trustedlogin-vendor')
    );

    return;
    //Add access key submenu page
    new MenuPage(
        MenuPage::SLUG_ACCESS_KEY,
        __('Access Key Login', 'trustedlogin-vendor')
    );


    //Add settings submenu page
    new MenuPage(
        MenuPage::SLUG_SETTINGS,
        __('Settings', 'trustedlogin-vendor')
    );
    return;
});
