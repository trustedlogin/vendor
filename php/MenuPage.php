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
                [$this, 'renderPage']
            );
        }else{
            //Top level page
            add_menu_page(
                $name,
                $name,
                'manage_options',
                self::PARENT_MENU_SLUG,
                [$this, 'renderPage'],
                'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDEzOS4zIDIyMC43IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxMzkuMyAyMjAuNyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbDojMDEwMTAxO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Im00Mi4yIDY5Ljd2LTIxLjZjMC0xNS4yIDEyLjMtMjcuNSAyNy41LTI3LjUgMTUuMSAwIDI3LjUgMTIuMyAyNy41IDI3LjV2MjEuNmM3LjUgMC41IDE0LjUgMS4yIDIwLjYgMi4xdi0yMy43YzAtMjYuNS0yMS42LTQ4LjEtNDguMS00OC4xLTI2LjYgMC00OC4yIDIxLjYtNDguMiA0OC4xdjIzLjdjNi4yLTAuOSAxMy4yLTEuNiAyMC43LTIuMXoiLz48cmVjdCBjbGFzcz0ic3QwIiB4PSIyMS41IiB5PSI2Mi40IiB3aWR0aD0iMjAuNiIgaGVpZ2h0PSIyNS41Ii8+PHJlY3QgY2xhc3M9InN0MCIgeD0iOTcuMSIgeT0iNjIuNCIgd2lkdGg9IjIwLjYiIGhlaWdodD0iMjUuNSIvPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Im02OS43IDc1LjNjLTM4LjUgMC02OS43IDQuOS02OS43IDEwLjh2NTRoNTYuOXYtOS44YzAtMi41IDEuOC0zLjYgNC0yLjNsMjguMyAxNi40YzIuMiAxLjMgMi4yIDMuMyAwIDQuNmwtMjguMyAxNi40Yy0yLjIgMS4zLTQgMC4yLTQtMi4zdi05LjhoLTU2Ljl2MTIuN2MwIDM4LjUgNDcuNSA1NC44IDY5LjcgNTQuOHM2OS43LTE2LjMgNjkuNy01NC44di03OS45Yy0wLjEtNS45LTMxLjMtMTAuOC02OS43LTEwLjh6bTAgMTIyLjRjLTIzIDAtNDIuNS0xNS4zLTQ4LjktMzYuMmgxNC44YzUuOCAxMy4xIDE4LjkgMjIuMyAzNC4xIDIyLjMgMjAuNSAwIDM3LjItMTYuNyAzNy4yLTM3LjJzLTE2LjctMzcuMi0zNy4yLTM3LjJjLTE1LjIgMC0yOC4zIDkuMi0zNC4xIDIyLjNoLTE0LjhjNi40LTIwLjkgMjUuOS0zNi4yIDQ4LjktMzYuMiAyOC4yIDAgNTEuMSAyMi45IDUxLjEgNTEuMS0wLjEgMjguMi0yMyA1MS4xLTUxLjEgNTEuMXoiLz48L3N2Zz4=',
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
        //Remove admin notices added correctly
        //see: https://github.com/trustedlogin/vendor/issues/35
        remove_all_actions('admin_notices');
        remove_all_actions('all_admin_notices');
        if( isset(
            $_REQUEST[MaybeRedirect::REDIRECT_KEY]
        ) ){
            return;
        }
        //Enqueue assets
        wp_enqueue_script(MenuPage::ASSET_HANDLE);
        wp_enqueue_style(MenuPage::ASSET_HANDLE);
    }

    /**
     * Render callback for admin page
     */
    public function renderPage(){


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
