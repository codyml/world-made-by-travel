<?php
/**
 * First template.
 *
 * @package WMT
 */

$admin_bar_class = is_admin_bar_showing() ? 'admin-bar-showing' : '';

?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<?php wp_body_open(); ?>
	<main id="App" class="<?php echo esc_attr( $admin_bar_class ); ?>"></main>
	<?php wp_footer(); ?>
</body>
</html>
