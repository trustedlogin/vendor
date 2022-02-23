<?php
namespace TrustedLogin\Vendor;

/**
 * Create a menu page.
 *
 * Creates parent and child pages.
 */
class MenuPage {

    //@todo make this just "trustedlogin"
    const PARENT_MENU_SLUG= 'trustedlogin-settings';

    const SLUG_ACCESS_KEY = 'trustedlogin_access_key_login';

    const SLUG_TEAM_SETTINGS = 'trustedlogin_team_settings';

    const SLUG_SETTINGS = 'trustedlogin_settings';

    const SLUG_HELPDESKS = 'trustedlogin_settings';

    const ASSET_HANDLE = 'trustedlogin-settings';

     /**
     * @var string
     */
    protected $name;

    /**
     * @var string
     */
    protected $childSlug;

    /**
     * @var string
     */
    protected $initialView;

    /**
     * @param string|null $childSlug Optional slug for the child page. If null, parent page is created.
     * @param string|null $name Optinal name for the menu page.
     * @param string|null $intialView Optional, passed to ViewProvider's initalView prop.
     */
    public function __construct( $childSlug = null, $name = null, $initalView = null ) {
        $this->childSlug = $childSlug;
        $this->childName = $name;
        $this->initialView = $initalView;
        add_action('admin_menu', [$this, 'addMenuPage'],25);
        add_action( 'admin_enqueue_scripts',[$this,'enqueueAssets'] );
    }

    /**
     * @uses "admin_menu"
     */
    public function addMenuPage(){
        $name = $this->name ?? __('TrustedLogin Settings', 'trustedlogin-vendor');
        if( $this->childSlug ){
            add_submenu_page(
                $this->childSlug,
                'manage_options',
                self::PARENT_MENU_SLUG,
                [$this, 'renderPage'],
                'dashicons-admin-generic',
            );
        }
        add_menu_page(
            $name,
            $name,
            'manage_options',
            self::PARENT_MENU_SLUG,
            [$this, 'renderPage'],
            'dashicons-admin-generic',
        );


    }

    /**
     * @uses "admin_enqueue_scripts"
     */
    public function enqueueAssets($hook){
        //@todo make this work with submenu pages.
        if ("toplevel_page_" . MenuPage::ASSET_HANDLE != $hook) {
            return;
        }
        wp_enqueue_script(MenuPage::ASSET_HANDLE);
        wp_enqueue_style(MenuPage::ASSET_HANDLE);
    }

    public function renderPage(){
        //@todo better way to handle error.
        if( isset($_GET['error'])){
            wp_die( sanitize_text_field($_GET['error']));
            exit;
        };
        if( $this->initialView){
            printf(
                '<script>window.tlInitialView = "%s"</script>',
                esc_attr($this->initialView)
            );
        }
        //React root
        echo '<div id="trustedlogin-settings"></div>';
    }

}
