# TrustedLogin Vendor

[![Built With Plugin Machine](https://img.shields.io/badge/Built%20With-Plugin%20Machine-lightgrey)](https://pluginmachine.com)

## Installation

- Git clone:
    - `git clone git@github.com:trustedlogin/vendor.git`
- Install javascript dependencies
    - `yarn`
- Install php dependencies
    - `composer install`

## Working With JavaScript

- Build JS/CSS
    - `yarn build`
- Start JS/CSS for development
    - `yarn start`
- Test changed files
    - `yarn test --watch`
- Test all files once
    - `yarn test`
    - `yarn test --ci`


## Working With PHP

### Autoloader

PHP classes should be located in the "php" directory and follow the [PSR-4 standard](https://www.php-fig.org/psr/psr-4/).

The root namespace is TrustedLoginVendor.

### Tests

Before doing this, you must create a ".env" file in the root of this plugin. You need to set the correct value for `TL_VENDOR_ENCRYTPTION_KEY`. Its value is known to Josh and Zack. It is set as a Github actions environment variable. This is not needed in production.

- Run WordPress tests
    - `composer test`
    - See local development instructions for how to run with Docker.

### Linter

[PHPCS](https://github.com/squizlabs/PHP_CodeSniffer) is installed for linting and [automatic code fixing](https://github.com/squizlabs/PHP_CodeSniffer/wiki/Fixing-Errors-Automatically).

- Run linter and autofix
    - `composer fixes`
- Run linter to identify issues.
    - `compose sniffs`

## Local Development Environment

A [docker-compose](https://docs.docker.com/samples/wordpress/)-based local development environment is provided.

- Start server
    - `docker-compose up -d`
- Access Site
    - [http://localhost:6301](http://localhost:6301)
- Run WP CLI command:
    - `docker-compose run wpcli wp user create admin admin@example.com --role=admin user_pass=pass`


There is a special phpunit container for running WordPress tests, with WordPress and MySQL configured.

- Enter container
    - `docker-compose run phpunit`
- Composer install
    - `composer install`
- Test
    - `composer test:wordpress`
