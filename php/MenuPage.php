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

    const SLUG_TEAMS = 'trustedlogin-teams';

    const SLUG_SETTINGS = 'trustedlogin-settings';

    const SLUG_HELPDESKS = 'trustedlogin-helpdesks';

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
     * @param string|null $name Optional name for the menu page.
     * @param string|null $initialView Optional, passed to ViewProvider's initialView prop.
     */
    public function __construct( $childSlug = null, $name = null, $initialView = null ) {
        $this->childSlug = $childSlug;
        $this->childName = $name;
        $this->initialView = $initialView;
        add_action('admin_menu', [$this, 'addMenuPage'],25);
        add_action( 'admin_enqueue_scripts',[$this,'enqueueAssets'] );
    }

    /**
     * Check if assets should be enqueued.
     *
     * @param string
     * @return bool
     */
    public function shouldEnqueueAssets($page){

        if ("toplevel_page_" . MenuPage::ASSET_HANDLE == $page) {

            return true;
        }


        if( in_array(
            str_replace( 'trustedlogin-settings_page_', '', $page), [
            self::SLUG_TEAMS,
            self::SLUG_HELPDESKS,
            self::SLUG_SETTINGS,
            self::SLUG_ACCESS_KEY,
            self::PARENT_MENU_SLUG,
        ])){
            return true;
        }
        return false;
    }

    /**
     * @uses "admin_menu"
     */
    public function addMenuPage(){
        $name = $this->childName ?? __('TrustedLogin Settings', 'trustedlogin-vendor');
        if( $this->childSlug ){
            add_submenu_page(
                self::PARENT_MENU_SLUG,
                $name,
                $name,
                'manage_options',
                $this->childSlug,
                [$this, 'renderPage'],
            );
        }else{
            //Top level page
            add_menu_page(
                $name,
                $name,
                'manage_options',
                self::PARENT_MENU_SLUG,
                [$this, 'renderPage'],
                'dashicons-admin-generic',
            );
        }

    }

    /**
     * @uses "admin_enqueue_scripts"
     */
    public function enqueueAssets($hook){
        //@todo make this work with submenu pages.
        if (!$this->shouldEnqueueAssets($hook)) {
            return;
        }
        wp_enqueue_script(MenuPage::ASSET_HANDLE);
        wp_enqueue_style(MenuPage::ASSET_HANDLE);
    }

    public function renderPage(){
        //@todo better way to handle error.
        if( isset($_GET['error'])){
            wp_die( sanitize_text_field($_GET['error']));
        }

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
