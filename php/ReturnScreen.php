<?php

namespace TrustedLogin\Vendor;
use TrustedLogin\Vendor\MenuPage;

/**
 * When returning from webhook/helpdesk:
 * Try to validate access key, if valid, return the mini-app.
 */
class ReturnScreen {
    protected $template;
    protected $settings;
    public function __construct(string $template,SettingsApi $settings){
        $this->template = $template;
        $this->settings = $settings;
    }

    /**
     * Return the HTML for the return screen.
     *
     * @uses "admin_init"
     */
    public function callback(){
        $data = trusted_login_vendor_prepare_data($this->settings);
		$html = $this->template;
		$html = str_replace("<script></script>",
			sprintf( '<script>window.tlVendor=%s;</script>',json_encode($data)
		), $html);
		$replace = site_url('/wp-content/plugins/vendor/build');
		$find = '/tlfavicon.ico';
		$html = str_replace('/tlfavicon.ico', $replace.$find, $html);
		$find = '/static/js';

		$html = str_replace(
			$find,$replace.$find,$html
		);
        echo $html;exit;

    }

}
