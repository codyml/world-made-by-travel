<?php
/**
 * Allows Markdown and SVG file uploads.
 *
 * @package WMT
 */

// Allows Markdown and SVG uploads.
add_filter(
	'upload_mimes',
	function( array $mime_types ) {
		$mime_types['svg'] = 'image/svg+xml';
		$mime_types['md']  = 'text/plain';
		return $mime_types;
	}
);
