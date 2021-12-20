<?php
//Register assets for TrustedLogin Acess
add_action('init', function () {
    $handle = 'trustedlogin-access';
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

//Enqueue assets for TrustedLogin Acess on admin page only
add_action('admin_enqueue_scripts', function ($hook) {
    if ('toplevel_page_trustedlogin-access' != $hook) {
        return;
    }
    wp_enqueue_script('trustedlogin-access');
});

//Register TrustedLogin Acess menu page
add_action('admin_menu', function () {
    add_menu_page(
        __('TrustedLogin Access', 'trustedlogin-vendor'),
        __('TrustedLogin Access', 'trustedlogin-vendor'),
        'manage_options',
        'trustedlogin-access',
        function () {
            //React root
            echo '<div id="trustedlogin-access"></div>';
        }
    );
});
