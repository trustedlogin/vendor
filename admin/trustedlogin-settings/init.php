<?php
//Register assets for TrustedLogin Settings

use TrustedLogin\Vendor\Status\Onboarding;
use TrustedLogin\Vendor\Reset;
use TrustedLogin\Vendor\MenuPage;

add_action('init', function () {
    $hasOnboarded = Onboarding::hasOnboarded();
    /**
     * Register assets
     */
    // This needs to be done once, not once per menu.
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
            'roles' => wp_roles()->get_names(),
            'onboarding' => Onboarding::hasOnboarded() ? 'COMPLETE' : '0',
            'accessKeyActions' => trustedlogin_vendor()->getAccessKeyActions(),
        ]);
        wp_register_style(
            MenuPage::ASSET_HANDLE,
            plugins_url("/trustedlogin-dist.css", dirname(__FILE__, 1)),
            [],
            md5_file(dirname(__FILE__, 2)."/trustedlogin-dist.css")
        );
    }

    // Add main menu page
    new MenuPage(
        //Do not pass args, would make it a child page.
    );

    /**
     * Add (sub)menu pages
     */
    if( $hasOnboarded ){
         //Add settings submenu page
         new MenuPage(
            MenuPage::SLUG_SETTINGS,
            __('Settings', 'trustedlogin-vendor'),
            'settings'
        );

        //Add access key submenu page
        new MenuPage(
            MenuPage::SLUG_TEAMS,
            __('Teams', 'trustedlogin-vendor'),
            'teams'
        );

        //Add helpdesks submenu page
        new MenuPage(
            MenuPage::SLUG_HELPDESKS,
            __('Help Desks', 'trustedlogin-vendor'),
            'integrations'
        );

        //Add access key submenu page
        new MenuPage(
            MenuPage::SLUG_ACCESS_KEY,
            __('Access Key Log-In', 'trustedlogin-vendor'),
            'teams/access_key'
        );
    }else{
        //Add onboarding submenu page
        new MenuPage(
            MenuPage::SLUG_SETTINGS,
            __('Onboarding', 'trustedlogin-vendor'),
            'onboarding'
        );
    }

});
