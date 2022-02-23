<?php


namespace TrustedLogin\Vendor\Status;

use TrustedLogin\Vendor\TeamSettings;

/**
 * Check if team is connected
 */
class IsTeamConnected {

    const KEY = 'connected';

    const VALUE_NOT_CHECKED = 'not_checked';

    const VALUE_CHECKED_NOT_CONNECTED = 'checked_not_connected';

    const VALUE_CHECKED_IS_CONNECTED = 'checked_is_connected';

    /**
     * Check if we were able to verify the team's connection
     */
    public static function check(TeamSettings $team){
        $check = \trustedlogin_vendor()
            ->verifyAccount($team);

        if( $check){
            $team->set(static::KEY, static::VALUE_CHECKED_NOT_CONNECTED);
        }else{
            $team->set(static::KEY, static::VALUE_CHECKED_IS_CONNECTED);
        }
        return $team;

    }

    /**
     * Check if we need to verify the team's connection
     */
    public static function needToCheck(TeamSettings $team) {
        return static::VALUE_NOT_CHECKED == $team->get(static::KEY);
    }
}
