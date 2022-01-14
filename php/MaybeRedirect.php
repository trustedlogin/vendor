<?php
namespace TrustedLogin\Vendor;

use TrustedLogin\Vendor\Traits\Logger;
use TrustedLogin\Vendor\Traits\VerifyUser;

/**
 * Checks for support redirect logins and tries to handle them.
 */
class MaybeRedirect
{

	use Logger, VerifyUser;
	/**
	 * Checks if the specified attributes are set has a valid access_key before checking if we can redirect support agent.
	 *
	 * @uses "template_redirect" action
	 * @since 1.0.0
	 */
	public function handle()
	{

		if (! isset($_REQUEST[ AccessKeyLogin::REDIRECT_ENDPOINT ])) {
			return;
		}

		$handler = new AccessKeyLogin();
		$parts_or_error = $handler->handle();
		if( is_array($parts_or_error)){
			wp_safe_redirect( $parts_or_error['loginurl'] );
		}
		wp_safe_redirect( admin_url('?page=trustedlogin-settings') );
		exit;

	}
}
