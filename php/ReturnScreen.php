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
     * Should we attempt to handle this request?
     *
     * @return bool
     */
    public function shouldHandle(){
        return ! empty(
            AccessKeyLogin::fromRequest(true)
        ) && ! empty(
            AccessKeyLogin::fromRequest(false)
        );
    }
    /**
     * Return the HTML for the return screen.
     *
     * @uses "admin_init"
     */
    public function callback(){
        if( ! $this->shouldHandle() ){
            return;
        }
        $data = trusted_login_vendor_prepare_data($this->settings);
        if( ! isset($data['redirectData'])){
            return;
        }
		$html = $this->template;
        //Put window.tlVendor in the HTML.
		$html = str_replace("<script></script>",
			sprintf( '<script>window.tlVendor=%s;</script>',json_encode($data)
		), $html);
        //Make URLs absoulte and correct
		$replace = site_url('/wp-content/plugins/vendor/build');
		//Fix favicon src
        $find = '/tlfavicon.ico';
		$html = str_replace('/tlfavicon.ico', $replace.$find, $html);
        //Fix script source
        $find = '/static/js';
		$html = str_replace(
			$find,$replace.$find,$html
		);
        //Fix style source
        $find = '/src/trustedlogin-dist.css';
        $replace = site_url('/wp-content/plugins/vendor');
        $html = str_replace(
            $find,$replace.$find,$html
        );
        echo $html;exit;

    }

}
