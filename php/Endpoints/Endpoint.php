<?php

namespace TrustedLogin\Vendor\Endpoints;

abstract class Endpoint {

    protected $namespace = 'trustedlogin/v1';
    public function register() {
        register_rest_route(
            $this->namespace,
            $this->route(),
            [
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => [ $this, 'get' ],
				'permission_callback' => [$this, 'authorize'],
                'args' => $this->getArgs(),
			],
			[
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => [ $this, 'update' ],
				'permission_callback' => [$this, 'authorize'],
				'args' 				  => $this->updateArgs(),
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
    abstract public function update(\WP_REST_Request $request);

    /**
     *
     * @param \WP_REST_Request $request
     * @return bool
     */
    public function authorize(\WP_REST_Request $request){
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
    protected function getArgs(){
        return [];
    }

    /**
     * Get the args for POST requests
     *
     * @return array
     */
    protected function updateArgs(){
        return [];
    }
}
