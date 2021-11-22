<?php
//Register assets for Trusted Login Settings
add_action('init', function () {
    $handle = 'trusted-login-settings';
    if( file_exists(dirname(__FILE__, 3). "/build/admin-page-$handle.asset.php" ) ){
        $assets = include dirname(__FILE__, 3). "/build/admin-page-$handle.asset.php";
        $dependencies = $assets['dependencies'];
        wp_register_script(
            $handle,
            plugins_url("/build/admin-page-$handle.js", dirname(__FILE__, 2)),
            $dependencies,
            $assets['version']
        );
    }
});

//Enqueue assets for Trusted Login Settings on admin page only
add_action('admin_enqueue_scripts', function ($hook) {
    if ('toplevel_page_trusted-login-settings' != $hook) {
        return;
    }
    wp_enqueue_script('trusted-login-settings');
});

//Register Trusted Login Settings menu page
add_action('admin_menu', function () {
    add_menu_page(
        __('Trusted Login Settings', 'trusted-login-vendor'),
        __('Trusted Login Settings', 'trusted-login-vendor'),
        'manage_options',
        'trusted-login-settings',
        function () {
            //React root
            echo '<div id="trusted-login-settings"></div>';
        }
    );
});
