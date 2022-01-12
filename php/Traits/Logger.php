<?php

namespace TrustedLogin\Vendor\Traits;

use DateTime;

trait Logger
{

	public function log( $message,$method, $logLevel = 'info' ,array $context = [] )
	{
		$logLevel = strtolower( $logLevel );
		if (defined('WP_DEBUG') && WP_DEBUG) {
			error_log($message);
		}
		//2022/01/06 17:34:16 [notice]
		$dateFormat = "Y/n/j g:i:a";
		$dateTime = (new DateTime())->format($dateFormat);
		//@todo changemode
		$file = fopen(dirname(__FILE__, 3).'/trustedlogin.log', "a");
		$output = sprintf("%s [%s]: (%s) %s %s \n",
			$dateTime,
			$logLevel,
			$method,
			$message,
			! empty( $context ) ? json_encode( $context ) : ''
		);

		fwrite($file, "\n". $output);
		fclose($file);
	}


}
