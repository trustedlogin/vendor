<?php
namespace TrustedLogin\Vendor;

use TrustedLogin\Vendor\Traits\Logger;
use TrustedLogin\Vendor\Traits\VerifyUser;
use TrustedLogin\Vendor\Webhooks\Factory;
use TrustedLogin\Vendor\Webhooks\Webhook;

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
		if ( isset($_REQUEST[ AccessKeyLogin::REDIRECT_ENDPOINT ])) {
			if( isset($_REQUEST['action']) && Webhook::WEBHOOK_ACTION == $_REQUEST['action']){
				$provider = $_REQUEST[Factory::PROVIDER_KEY];
				if( ! in_array($provider, Factory::getProviders())){
					$this->log( 'Unknown provider: ' . $provider,__METHOD__ );
					return;
				}
				$accountId = $_REQUEST[AccessKeyLogin::ACCOUNT_ID_INPUT_NAME];

				try {
					$team  = SettingsApi::fromSaved()->getByAccountId($accountId);
					$webhook = Factory::webhook( $team );
					$r = $webhook->webhookEndpoint();
					if( 200 === $r['status']){
						wp_send_json_success($r);
					}else{
						wp_send_json_error($r,$r['status']);
					}
				} catch (\Throwable $th) {
					wp_send_json_error( ['message' => $th->getMessage()],404);
				}
				exit;
			}

			$handler = new AccessKeyLogin();
			$parts_or_error = $handler->handle();
			if( is_array($parts_or_error)){
				wp_safe_redirect( $parts_or_error['loginurl'] );
			}

			wp_safe_redirect(
				add_query_arg( [
					'page' => 'trustedlogin-settings',
					'error' => $parts_or_error->get_error_code()
				], admin_url() )
			);
			exit;
		}
	}
}
