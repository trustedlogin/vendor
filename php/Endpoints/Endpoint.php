<?php

namespace TrustedLogin\Vendor\Endpoints;

abstract class Endpoint
{
	const PUBLIC_KEY_SUCCESS_STATUS = 200;
	const PUBLIC_KEY_ERROR_STATUS = 501;

	const NAMESPACE =  'trustedlogin/v1';
	public function register($editable = true)
	{
		$args = [
			'methods'             => \WP_REST_Server::READABLE,
			'callback'            => [ $this, 'get' ],
			'permission_callback' => [$this, 'authorize'],
			'args' => $this->getArgs(),
		];
		if ($editable) {
			register_rest_route(
				self::NAMESPACE,
				$this->route(),
				[
					'methods'             => \WP_REST_Server::EDITABLE,
					'callback'            => [ $this, 'update' ],
					'permission_callback' => [$this, 'authorize'],
					'args' 				  => $this->updateArgs(),
				]
			);
		}

		register_rest_route(
			self::NAMESPACE,
			$this->route(),
			[
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get' ],
				'permission_callback' => [$this, 'authorize'],
				'args' => $this->getArgs(),
			]
		);
	}



	/**
	 * Callback for GET requests
	 *
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	abstract public function get(\WP_REST_Request $request);

	/**
	 * Callback for POST requests
	 * @param \WP_REST_Request $request
	 * @return \WP_REST_Response
	 */
	public function update(\WP_REST_Request $request)
	{
		return new \WP_REST_Response(
			[],
			501
		);
	}

	/**
	 *
	 * @param \WP_REST_Request $request
	 * @return bool
	 */
	public function authorize(\WP_REST_Request $request)
	{
		$capability = is_multisite() ? 'delete_sites' : 'manage_options';
		return current_user_can($capability);
	}

	/**
	 * Get the route URI
	 *
	 * @return string
	 */
	abstract protected function route();

	/**
	 * Get the args for GET requests
	 *
	 * @return array
	 */
	protected function getArgs()
	{
		return [];
	}

	/**
	 * Get the args for POST requests
	 *
	 * @return array
	 */
	protected function updateArgs()
	{
		return [];
	}
}
