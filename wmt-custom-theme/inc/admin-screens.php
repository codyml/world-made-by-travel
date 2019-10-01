<?php
/**
 * Removes unused admin pages from the menu and adds ACF Options
 * pages for additional settings.
 *
 * @package WMT
 */

// Removes unused menu items.
add_action(
	'admin_menu',
	function() {
		remove_menu_page( 'edit.php' ); // Removes Posts.
		remove_menu_page( 'edit.php?post_type=page' ); // Removes Pages.
		remove_menu_page( 'edit-comments.php' ); // Removes Comments.
	}
);

// Adds ACF options pages.
if ( function_exists( 'acf_add_options_page' ) ) {

	// Adds Cover page.
	acf_add_options_page(
		array(
			'page_title' => 'Cover',
			'position'   => '32.1',
			'icon_url'   => 'dashicons-format-image',
		)
	);

	// Adds Table of Contents page.
	acf_add_options_page(
		array(
			'page_title' => 'Table of Contents',
			'position'   => '33.1',
			'icon_url'   => 'dashicons-list-view',
		)
	);

	// Adds page for other book settings.
	acf_add_options_page(
		array(
			'page_title' => 'Book Settings',
			'position'   => '34.1',
			'icon_url'   => 'dashicons-book',
		)
	);

}
