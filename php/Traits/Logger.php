<?php

namespace TrustedLogin\Vendor\Traits;

trait Logger
{

	public function log(string $message)
	{
		if (defined('WP_DEBUG') && WP_DEBUG) {
			error_log($message);
		}

		$file = fopen(dirname(__FILE__, 3).'/trustedlogin.log', "a");
		fwrite($file, "\n". $message);
		fclose($file);
	}
}
