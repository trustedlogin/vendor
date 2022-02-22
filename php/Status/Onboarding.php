<?php


namespace TrustedLogin\Vendor\Status;

use TrustedLogin\Vendor\SettingsApi;

/**
 * Track onboarding status
 */
class Onboarding {
    /**
	 * The name of the option we store onboarding status in.
	 */
	const ONBOARDED = 'trustedlogin_has_onboarded';

    /**
     * Check if we have already unboarded
     * @return bool
     */
    public static function hasOnboarded() {
        return get_option( self::ONBOARDED, 0 ) == '1';
    }

    /**
     * Set onboarding status to has onboarded
     *
     * @param void
     */
    public static function setHasOnboarded() {
        update_option( self::ONBOARDED, 1 );
    }

    /**
     * Maybe update onboarding status on save of team settings
     *
     * @uses "trustedlogin_vendor_settings_saved" action
     */
    public static function settingsSaved(int $count){
        if( ! self::hasOnboarded())
        {
            self::setHasOnboarded();
        }
    }
}
