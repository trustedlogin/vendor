<?php
namespace TrustedLogin\Vendor\Traits;

trait Licensing {

	public function eddHasLicensing() {
		return function_exists( 'edd_software_licensing' );
	}

	public function eddGetLicenses( $email ) {

		$licenses = array();
		$_u   = get_user_by( 'email', $email );

		if ( $_u ) {

			$licenses = edd_software_licensing()->get_license_keys_of_user( $_u->ID, 0, 'all', true );

			foreach ( $licenses as $license ) {
				$children = edd_software_licensing()->get_child_licenses( $license->ID );
				if ( $children ) {
					foreach ( $children as $child ) {
						$licenses[] = edd_software_licensing()->get_license( $child->ID );
					}
				}

				$licenses[] = edd_software_licensing()->get_license( $license->ID );
			}
		}

		return ( ! empty( $licenses ) ) ? $licenses : false;
	}

	public function eddVerifyLicense( $key ) {

		$key = sanitize_text_field( $key );

		$license = new EDD_SL_License( $key );

		$this->log( 'License: ' , __METHOD__, 'debug', [
			'license' => $license,
		] );

		return $license->exists;
	}

	/**
	 * Helper function: Check if the current site is an EDD store
	 *
	 * @since 0.2.0
	 * @return Boolean
	 */
	public function isEddStore() {
		return class_exists( 'Easy_Digital_Downloads' );
	}

	/**
	 * Helper function: Check if the current site is Woocommerce store
	 *
	 * @since 0.8.0
	 * @return Boolean
	 */
	public function isWooStore() {
		return class_exists( 'woocommerce' );
	}

	public function getLicensesBy( $type, $value ) {

		$this->log( 'Getting licenses', __METHOD__, 'debug', array( 'type' => $type, 'value' => $value ) );

		if ( ! in_array( $type, array( 'email', 'key' ) ) ) {
			return false;
		}

		if ( $this->isEDDStore() && $this->eddHasLicensing() ) {
			if ( 'email' == $type ) {
				return $this->eddGetLicenses( $value );
			} else if ( 'key' == $type ) {
				return $this->eddVerifyLicense( $value );
			}
		} else if ( $this->isWooStore() ) {
			// handle woo licensing
		}

		return false;

	}
}
