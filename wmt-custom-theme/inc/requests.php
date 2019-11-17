<?php
/**
 * Configures server request handling for use as a headless CMS.
 *
 * @package WMT
 */

// Disables WordPress's automatic redirects to existing DB objects.
remove_filter( 'remplate_redirect', 'redirect_canonical' );

// Forces WordPress to return 200 status code even for URLs not matching
// a database object.
add_filter(
	'template_redirect',
	function() {
		global $wp_query;
		status_header( 200 );
		$wp_query->is_404 = false;
	},
	0
);


// Returns the `index.php` template for all URLs not starting with
// "wp-".
add_action(
	'template_include',
	function() {
		$url_path = wp_parse_url( add_query_arg( array() ), PHP_URL_PATH );
		if ( strpos( $url_path, 'wp-' ) !== 0 ) {
			locate_template( 'index.php', true );
		}
	}
);


// Configures permalinks so WordPress creates an .htaccess file allowing
// it to handle any path according to the above rules.  NOTE: you
// must open the WordPress Permalinks settings page for this change
// to take effect.
add_action(
	'init',
	function() {
		global $wp_rewrite;
		if ( '/%postname%' !== $wp_rewrite->permalink_structure ) {
			$wp_rewrite->set_permalink_structure( '/%postname%' );
			update_option( 'rewrite_rules', false );
			$wp_rewrite->flush_rules( true );
		}
	}
);
