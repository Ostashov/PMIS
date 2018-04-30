CREATE TABLE IF NOT EXISTS users (
	id serial,
	login text,
	email text,
	firstname text,
	lastname text,
	password text,
	register_dttm timestamp,
	usertype_id smallint,
	deleted_flag boolean,
	login_attempts smallint,
	last_login_attempt date
	PRIMARY KEY( id )
);