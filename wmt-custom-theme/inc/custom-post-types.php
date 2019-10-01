<?php
/**
 * Registers custom post types for Section and Author posts.
 *
 * @package WMT
 */

// Authors CPT.
register_post_type(
	AUTHOR_POST_TYPE,
	array(
		'labels'        => array(
			'name'                     => 'Authors',
			'singular_name'            => 'Author',
			'add_new_item'             => 'Add New Author',
			'edit_item'                => 'Edit Author',
			'new_item'                 => 'New Author',
			'view_item'                => 'View Author',
			'view_items'               => 'View Authors',
			'search_items'             => 'Search Authors',
			'not_found'                => 'No Authors found',
			'not_found_in_trash'       => 'No Authors found in trash',
			'all_items'                => 'All Authors',
			'attributes'               => 'Author Attributes',
			'insert_into_item'         => 'Insert into Author',
			'uploaded_to_this_item'    => 'Uploaded to this Author',
			'item_published'           => 'Author published.',
			'item_published_privately' => 'Author published privately.',
			'item_reverted_to_draft'   => 'Author reverted to draft.',
			'item_scheduled'           => 'Author scheduled.',
			'item_updated'             => 'Author updated.',
		),
		'public'        => false,
		'show_ui'       => true,
		'supports'      => array( 'title' ),
		'show_in_rest'  => true,
		'rest_base'     => 'authors',
		'menu_position' => 10.1,
		'menu_icon'     => 'dashicons-businessperson',
	)
);

// Makes sure the Slug metabox is visible.
add_action(
	'admin_init',
	function() {
		update_user_meta( get_current_user_id(), 'metaboxhidden_' . AUTHOR_POST_TYPE, array() );
	}
);

// Sections CPT.
register_post_type(
	SECTION_POST_TYPE,
	array(
		'labels'        => array(
			'name'                     => 'Sections',
			'singular_name'            => 'Section',
			'add_new_item'             => 'Add New Section',
			'edit_item'                => 'Edit Section',
			'new_item'                 => 'New Section',
			'view_item'                => 'View Section',
			'view_items'               => 'View Sections',
			'search_items'             => 'Search Sections',
			'not_found'                => 'No sections found',
			'not_found_in_trash'       => 'No sections found in trash',
			'all_items'                => 'All Sections',
			'attributes'               => 'Section Attributes',
			'insert_into_item'         => 'Insert into section',
			'uploaded_to_this_item'    => 'Uploaded to this section',
			'item_published'           => 'Section published.',
			'item_published_privately' => 'Section published privately.',
			'item_reverted_to_draft'   => 'Section reverted to draft.',
			'item_scheduled'           => 'Section scheduled.',
			'item_updated'             => 'Section updated.',
		),
		'public'        => false,
		'show_ui'       => true,
		'supports'      => array( 'title' ),
		'show_in_rest'  => true,
		'rest_base'     => 'sections',
		'menu_position' => 11.1,
		'menu_icon'     => 'dashicons-media-document',
	)
);

// Makes sure the Slug metabox is visible.
add_action(
	'admin_init',
	function() {
		update_user_meta( get_current_user_id(), 'metaboxhidden_' . SECTION_POST_TYPE, array() );
	}
);
