<?php
/**
 * Adds REST endpoints used by the front-end application.
 *
 * @package WMT
 */

/**
 * Returns the contents of an attachment file given its ID.
 *
 * @param int $id The ID of the attachment.
 */
function wmt_get_file_contents( $id ) {
	$path = get_attached_file( $id );
	ob_start();
	include $path;
	return ob_get_clean();
}


/**
 * Returns all Authors, prepared for REST response.
 */
function wmt_get_authors_for_rest() {
	$authors_query = new WP_Query(
		array(
			'post_type'      => AUTHOR_POST_TYPE,
			'posts_per_page' => -1,
		)
	);

	return array_map(
		function( WP_Post $author ) {
			return array(
				'slug'              => $author->post_name,
				'name'              => $author->post_title,
				'biographyMarkdown' => wmt_get_file_contents(
					get_field( 'markdown', $author )
				),
			);
		},
		$authors_query->posts
	);
}


/**
 * Returns the metadata of a Section given its ID.
 *
 * @param int $id The ID of the Section.
 */
function wmt_get_section_meta( $id ) {
	$post = get_post( $id );
	if ( get_post_status( $post ) === 'publish' ) {
		return array(
			'slug'          => $post->post_name,
			'title'         => $post->post_title,
			'author'        => get_field( 'author', $id ) ?: null,
			'explorer_link' => get_field( 'explorer_link', $id ) ?: false,
		);
	}

	return null;
}


/**
 * Returns the content of a Section given its ID.
 *
 * @param int $post The ID of the Section.
 */
function wmt_get_section_content( $post ) {
	if ( get_field( 'explorer_link', $post ) ) {
		return null;
	}

	return array(
		'markdown' => wmt_get_file_contents( get_field( 'markdown', $post ) ),
		'download' => get_field( 'downloadable', $post ) ? get_field( 'pdf', $post ) : null,
		'figures'  => array_map(
			function( $figure ) {
				return array(
					'identifier' => $figure['identifier'],
					'image'      => $figure['image'] ?: null,
					'markdown'   => (
						$figure['markdown']
						? wmt_get_file_contents( $figure['markdown'] )
						: null
					),
					'download'   => (
						$figure['downloadable']
						? (
							$figure['markdown']
							? $figure['pdf']
							: $figure['image']
						)
						: null
					),
				);
			},
			get_field( 'figures', $post ) ?: array(),
		),

		'blocks'   => array_map(
			function( $block ) {
				return array(
					'title'          => $block['title'],
					'author'         => $block['author'],
					'markdown'       => wmt_get_file_contents( $block['markdown'] ),
					'download'       => $block['downloadable'] ? $block['pdf'] : null,
					'belowFootnotes' => $block['below_footnotes'],
				);
			},
			get_field( 'blocks', $post ) ?: array(),
		),
	);
}


/**
 * Returns the book-wide configuration settings and content set on
 * the Cover and Book Config pages.
 */
function wmt_get_config_for_rest() {
	return array(
		// From Book Config Options page.
		'instructionsMarkdown'            => (
			null !== get_field( 'instructions_markdown', 'options' )
			? wmt_get_file_contents( get_field( 'instructions_markdown', 'options' ) )
			: null
		),

		'printViewIntroductionMarkdown'   => wmt_get_file_contents(
			get_field( 'print_view_introduction_markdown', 'options' )
		),

		'explorerBaseUrl'                 => get_field( 'explorer_base_url', 'options' ),
		'bookCitationBaseUrl'             => get_field( 'book_citation_base_url', 'options' ) ?: null,
		'enablePrintMarginLink'           => get_field( 'enable_print_margin_link', 'options' ) ?: false,
		'highlightInvalidLinksAndFigures' => get_field( 'highlight_invalid_links_and_figures', 'options' ) ?: false,

		// From Cover Options page.
		'coverTitle'                      => get_field( 'title', 'options' ),
		'coverSubtitle'                   => get_field( 'subtitle', 'options' ),
		'coverAuthor'                     => get_field( 'author', 'options' ),
		'coverContentMarkdown'            => wmt_get_file_contents(
			get_field( 'markdown', 'options' )
		),

		'backgroundImageUrl'              => get_field( 'background_image', 'options' ),
		'backgroundImageAttribution'      => get_field( 'background_image_attribution', 'options' ),
		'coverCopyright'                  => get_field( 'copyright', 'options' ),
		'coverNumbers'                    => get_field( 'numbers', 'options' ),
		'coverCredits'                    => get_field( 'credits', 'options' ),
	);
}


/**
 * Returns the section group and section metadata from the Table
 * of Contents, prepared for REST response.
 */
function wmt_get_table_of_contents_for_rest() {
	return array_map(
		function( $toc_item ) {
			if ( 'section_group' === $toc_item['acf_fc_layout'] ) {
				return array(
					'slug'     => $toc_item['slug'],
					'title'    => $toc_item['title'],
					'author'   => $toc_item['author'] ?: null,
					'sections' => array_map(
						'wmt_get_section_meta',
						$toc_item['sections']
					),
				);
			}

			// If top-level section.
			return wmt_get_section_meta( $toc_item['section'] );
		},
		get_field( 'table_of_contents', 'options' )
	);
}


/**
 * Registers a "/wmt/book-content" endpoint that returns all book
 * content except for individual sections, prepared for REST response.
 */
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			REST_API_NAMESPACE,
			'/book-content',
			array(
				'methods'  => 'GET',
				'callback' => function( WP_REST_Request $request ) {
					$response = array(
						'authors'         => wmt_get_authors_for_rest(),
						'config'          => wmt_get_config_for_rest(),
						'tableOfContents' => wmt_get_table_of_contents_for_rest(),
					);
					return $response;
				},
			)
		);
	}
);


/**
 * Registers a "/wmt/section-content" endpoint that returns the content
 * for a section referenced by ID, prepared for REST response.
 */
add_action(
	'rest_api_init',
	function() {
		register_rest_route(
			REST_API_NAMESPACE,
			'/section-content',
			array(
				'methods'  => 'GET',
				'callback' => function( WP_REST_Request $request ) {
					$slug = isset( $request['slug'] ) ? $request['slug'] : null;
					$post = get_page_by_path( $slug, 'OBJECT', SECTION_POST_TYPE );
					if ( null !== $post && get_post_status( $post ) === 'publish' ) {
						return wmt_get_section_content( $post );
					}

					return null;
				},
			)
		);
	}
);
