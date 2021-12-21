<?php

namespace TrustedLogin\Vendor;

use TrustedLogin\Vendor\Traits\Logger;
/**
 * When in debug mode, log all errors to our log
 *
 * @see https://github.com/inpsyde/Wonolog/blob/master/src/PhpErrorController.php
 */
class ErrorHandler {

    use Logger;

	/**
	 * Register error handlers
	 *
	 * @see https://github.com/inpsyde/Wonolog/blob/b1af1bcc8bdec2bd153a323bbbf507166c9c8e1b/src/Controller.php#L103-L106
	 */
	public static function register(){

		$controller = new static();
		register_shutdown_function( [ $controller, 'on_fatal', ] );
		set_error_handler( [ $controller, 'on_error' ], E_ALL|E_STRICT );
		set_exception_handler( [ $controller, 'on_exception', ] );
	}
    /**
	 * Error handler.
	 *
	 * @param  int        $num
	 * @param  string     $str
	 * @param  string     $file
	 * @param  int        $line
	 * @param  array|null $context
	 *
	 * @return bool
	 */
	public function on_error( $num, $str, $file, $line, $context = NULL ) {
        $this->log( implode(' ',  [$num,$str, "$file:$line"] ) );
		return false;
	}

	/**
	 * Uncaught exception handler.
	 *
	 * @param  \Throwable $e
	 *
	 * @throws \Throwable
	 */
	public function on_exception( $e ) {

        $this->on_error( $e->getCode(), $e->getMessage(), $e->getFile(), $e->getLine() );

		throw $e;
	}

	/**
	 * Checks for a fatal error, work-around for `set_error_handler` not working with fatal errors.
	 */
	public function on_fatal() {

		$last_error = error_get_last();
		if ( ! $last_error ) {
			return;
		}

		$error = array_merge( [ 'type' => -1, 'message' => '', 'file' => '', 'line' => 0 ], $last_error );

		$fatals = [
			E_ERROR,
			E_PARSE,
			E_CORE_ERROR,
			E_CORE_WARNING,
			E_COMPILE_ERROR,
			E_COMPILE_WARNING,
		];

		if ( in_array( $error[ 'type' ], $fatals, TRUE ) ) {
			$this->on_error( $error[ 'type' ], $error[ 'message' ], $error[ 'file' ], $error[ 'line' ] );
		}
	}
}
