<?php
/**
 * Enqueues the JS and CSS bundles created by Webpack.
 *
 * @package WMT
 */

add_action(
	'wp_enqueue_scripts',
	function() {
		$theme_script_path = '/static/script.js';
		wp_enqueue_script(
			'theme_script',
			get_template_directory_uri() . $theme_script_path,
			array(),
			filemtime( get_stylesheet_directory() . $theme_script_path ),
			true
		);

		$theme_styles_path = '/static/styles.css';
		wp_enqueue_style(
			'theme_styles',
			get_template_directory_uri() . $theme_styles_path,
			array(),
			filemtime( get_stylesheet_directory() . $theme_styles_path )
		);
	}
);
