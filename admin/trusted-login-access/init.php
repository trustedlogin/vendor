<?php
//Register assets for Trusted Login Acess
add_action('init', function () {
    $handle = 'trusted-login-access';
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

//Enqueue assets for Trusted Login Acess on admin page only
add_action('admin_enqueue_scripts', function ($hook) {
    if ('toplevel_page_trusted-login-access' != $hook) {
        return;
    }
    wp_enqueue_script('trusted-login-access');
});

//Register Trusted Login Acess menu page
add_action('admin_menu', function () {
    add_menu_page(
        __('Trusted Login Acess', 'trusted-login-vendor'),
        __('Trusted Login Acess', 'trusted-login-vendor'),
        'manage_options',
        'trusted-login-access',
        function () {
            //React root
            echo '<div id="trusted-login-access"></div>';
        }
    );
});
