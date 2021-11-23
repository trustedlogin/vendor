<?php
namespace TrusteLoginVendor\Tests\Integration;

use PHPUnit\Framework\TestCase;

/**
 * These tests proves integration test setup works.
 *
 * They are useful for debugging, you may choose to delete
 */
class EnvironmentTest extends \WP_UnitTestCase  {


    /**
     * This tests makes sure:
     *
     * - WordPress functions are defined
     * - WordPress database can be written to.
     */
	function testWordPress()
    {
        global  $wpdb;
        $this->assertTrue(is_object($wpdb));
        $id = wp_insert_post([
            'post_type' => 'post',
            'post_title' => 'roy',
            'post_content' => 'sivan'
        ]);
        $this->assertTrue(is_numeric($id));
    }

    public function test_creates_a_valid_post() {
		$post_id = self::factory()->post->create();
		$this->assertInstanceOf( \WP_Post::class, get_post( $post_id ));
	}
}
