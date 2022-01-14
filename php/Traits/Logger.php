<?php

namespace TrustedLogin\Vendor\Traits;

use DateTime;

trait Logger
{

	public function log( $message,$method, $logLevel = 'info' , $context = [] )
	{
		$context = (array) $context;
		$logLevel = strtolower( $logLevel );
		if (defined('WP_DEBUG') && WP_DEBUG) {
			error_log($message);
		}
		$message = "[{$this->getTimestamp()}] [{$logLevel}] {$message}";
		if($context) {
			$message .= ' ' . json_encode($context, JSON_PRETTY_PRINT);
		}

		$logFileName = dirname(__FILE__, 3).'/trustedlogin.log';
		if( ! file_exists( $logFileName ) ) {
			touch( $logFileName );
		}

		$file = fopen($logFileName, "a");

		fwrite($file, "\n". $message);
		fclose($file);
	}

 	/**
     * Formats the message for logging.
     *
     * @param  string $level   The Log Level of the message
     * @param  string $message The message to log
     * @param  array  $context The context
	 *
	 * @see https://github.com/katzgrau/KLogger/blob/master/src/Logger.php#L260-L294
     * @return string
     */
    protected function formatMessage($level, $message, $context)
    {
        $message = "[{$this->getTimestamp()}] [{$level}] {$message}";
        if ($this->options['appendContext'] && ! empty($context)) {
            $message .= PHP_EOL.$this->indent($this->contextToString($context));
        }

        return $message.PHP_EOL;

    }

	/**
     * Gets the correctly formatted Date/Time for the log entry.
     *
     * PHP DateTime is dump, and you have to resort to trickery to get microseconds
     * to work correctly, so here it is.
     *
	 * @see https://github.com/katzgrau/KLogger/blob/master/src/Logger.php#L296-L311
	 *
     * @return string
     */
    private function getTimestamp()
    {
        $originalTime = microtime(true);
        $micro = sprintf("%06d", ($originalTime - floor($originalTime)) * 1000000);
        $date = new DateTime(date('Y-m-d H:i:s.'.$micro, $originalTime));

        return $date->format($this->options['dateFormat']);
    }


}
