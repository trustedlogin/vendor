<?php
//Register assets for TrustedLogin Settings
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
        wp_register_style(
            $handle,
            plugins_url("/build/style-admin-page-$handle.css", dirname(__FILE__, 2)),
            [],
            $assets['version']
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
            //React root
            echo '<div id="trustedlogin-settings"></div>';
        }
    );
});
