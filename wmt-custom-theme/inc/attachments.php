<?php
/**
 * Allows Markdown and SVG file uploads.
 *
 * @package WMT
 */

// Allows Markdown and SVG uploads.
add_filter(
	'upload_mimes',
	function( $mimes ) {
		$mimes['svg'] = 'image/svg+xml';
		$mimes['md']  = 'text/plain';
		return $mimes;
	}
);
