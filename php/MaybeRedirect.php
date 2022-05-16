<?php
namespace TrustedLogin\Vendor;

use TrustedLogin\Vendor\Status\IsIntegrationActive;
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
	const REDIRECT_KEY = 'tl_redirect';

	/**
	 * Handle the "Reset All" button in UI
	 *
	 * @uses "admin_init" action
	 */
	public static function adminInit(){
		//Reset all data
		if( isset($_REQUEST['action']) && Reset::ACTION_NAME == $_REQUEST['action'] ){
			if( ! wp_verify_nonce( $_REQUEST['_wpnonce'], Reset::NONCE_ACTION )){
				wp_safe_redirect(
					add_query_arg( [
						'page' => 'trustedlogin-settings',
						'error' => 'nonce'
					], admin_url() )
				);
				exit;
			}
			(new Reset())->resetAll(
				\trustedlogin_vendor()
			);

			wp_safe_redirect(
				add_query_arg( [
					'page' => 'trustedlogin-settings',
					'success' => 'reset'
				], admin_url() )
			);
			exit;
		}
	}
	/**
	 * Checks if the specified attributes are set has a valid access_key before checking if we can redirect support agent.
	 *
	 * @uses "template_redirect" action
	 * @since 1.0.0
	 */
	public static function handle()
	{
		//Access key redirect
		if ( isset($_REQUEST[ AccessKeyLogin::REDIRECT_ENDPOINT ])) {
			if( isset($_REQUEST['action']) && Webhook::WEBHOOK_ACTION == $_REQUEST['action']){
				$provider = $_REQUEST[Factory::PROVIDER_KEY];
				if( ! in_array($provider, Factory::getProviders())){
					//$this->log( 'Unknown provider: ' . $provider,__METHOD__ );
					return;
				}
				if( ! IsIntegrationActive::check($provider)){
					//$this->log( 'Integration not active: ' . $provider,__METHOD__ );
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
			$parts = $handler->handle();
			$parts = \json_decode('
			{
				"identifier": "F6qvCYIze7i/Ekx4GaYYpNwrlepY8IABPsJFihZD3FRN57eBzx3U3T3HdsRu6cfe9Rr94eihV68dFj3++BNwK7xqrDYJA6Ha+r7vYKwx5vf9tf+/vaLwrro0mLE+9SXcn1cMeFbNQ5v/gz86gu7Qz23QkOsy7mFC2ffU4+dIR8IuOPrdIxGWWs+tPBkaXUn2",
				"metaData": [],
				"nonce": "4be257f01d160b6428e028f3aa6093ef2db20bc0475af948",
				"publicKey": "32adb1fdfa3da41a94d8c2342f6c4a7fb4e6b7c1987313a73fb8bbf45cb7051f",
				"siteurl": "https://trustedlogin.support"
			  }', true );

			$parts['endpoint'] = \trustedlogin_vendor()->getEncryption()::hash($parts['siteurl'] . $parts['identifier']);
			$parts['loginurl'] = $parts['siteurl'] . '/' . $parts['endpoint'] . '/' . $parts['identifier'];
			if( is_array($parts)){
				$output = sprintf('<div>
					<form
						method="post"
						id="trusted-login-redirect-form"
						action="%s"
					>
						<input type="hidden" name="action" value="trustedlogin">
						<input type="hidden" name="endpoint" value="%s">
						<input type="hidden" name="identifier" value="%s">

					</form>
				</div>',
					esc_url($parts['loginurl']),
					esc_attr($parts['endpoint']),
					esc_attr($parts['identifier'])

				);
				$output .= ('<script>
					window.addEventListener("load", () => {
						document.getElementById("trusted-login-redirect-form").submit();
				  	});
				</script>');
				echo $output;
				exit;
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
