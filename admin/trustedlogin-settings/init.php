<?php
//Register assets for TrustedLogin Settings

use TrustedLogin\Vendor\Status\Onboarding;
use TrustedLogin\Vendor\Reset;

add_action('init', function () {
    $handle = 'trustedlogin-settings';
    if( file_exists(dirname(__FILE__, 3). "/build/admin-page-$handle.asset.php" ) ){
        $assets = include dirname(__FILE__, 3). "/build/admin-page-$handle.asset.php";
        $dependencies = $assets['dependencies'];
        wp_register_script(
            $handle,
            plugins_url("/build/admin-page-$handle.js", dirname(__FILE__, 2)),
            $dependencies,
            $assets['version']
        );
        wp_localize_script($handle,'tlVendor', [
            'resetAction' => esc_url_raw(Reset::actionUrl()),
            'roles' => wp_roles()->get_names(),
            'onboarding' => Onboarding::hasOnboarded() ? 'COMPLETE' : '0',
            'accessKeyActions' => trustedlogin_vendor()->getAccessKeyActions(),
        ]);
        wp_register_style(
            $handle,
            plugins_url("/trustedlogin-dist.css", dirname(__FILE__, 1)),
            [],
            md5_file(dirname(__FILE__, 2)."/trustedlogin-dist.css"),
        );


    }

});

//Enqueue assets for TrustedLogin Settings on admin page only
add_action('admin_enqueue_scripts', function ($hook) {
    if ('toplevel_page_trustedlogin-settings' != $hook) {
        return;
    }
    wp_enqueue_script('trustedlogin-settings');
    wp_enqueue_style('trustedlogin-settings');

});

//Register TrustedLogin Settings menu page
add_action('admin_menu', function () {
    add_menu_page(
        __('TrustedLogin Settings', 'trustedlogin-vendor'),
        __('TrustedLogin Settings', 'trustedlogin-vendor'),
        'manage_options',
        'trustedlogin-settings',
        function () {
            //@todo better way to handle error.
            if( isset($_GET['error'])){
                wp_die( sanitize_text_field($_GET['error']));
                exit;
            };
            //React root
            echo '<div id="trustedlogin-settings"></div>';
        }
    );
});
