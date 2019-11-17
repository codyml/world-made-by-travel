delete from wp_users;
delete from wp_usermeta;
insert into wp_users (user_login, user_pass, user_nicename, user_email, user_registered, display_name) values ('dev', md5('dev'), 'dev', 'dev@127.0.0.1', now(), 'Developer');
insert into wp_usermeta (user_id, meta_key, meta_value) values (last_insert_id(), 'wp_capabilities', 'a:1:{s:13:"administrator";s:1:"1";}');
insert into wp_usermeta (user_id, meta_key, meta_value) values (last_insert_id(), 'wp_user_level', '10');
update wp_options set option_value = 'http://localhost:12345' where option_name in ('siteurl', 'home');
update wp_options set option_value = 'A World Made by Travel (Dev)' where option_name = 'blogname';
