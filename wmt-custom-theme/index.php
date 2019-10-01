<?php
/**
 * First template.
 *
 * @package WMT
 */

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<div>This is static content from WordPress.</div>
	<?php wp_footer(); ?>
</body>
</html>
