<?php
/**
 * Functions executed at theme load.
 *
 * @package WMT
 */

// Defines constants used in the site.
define( 'SECTION_POST_TYPE', 'wmt_section' );
define( 'AUTHOR_POST_TYPE', 'wmt_author' );

// Configures WordPress to be a headless CMS for a single-page application.
require_once 'inc/headless.php';

// Registers custom post types used by the content model.
require_once 'inc/custom-post-types.php';

// Removes unused admin screens and adds new admin screens.
require_once 'inc/admin-screens.php';

// Configures upload of attachments.
require_once 'inc/attachments.php';

// Enqueues the JavaScript bundle created by Webpack.
require_once 'inc/static.php';
