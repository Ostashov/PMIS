CREATE TABLE IF NOT EXISTS users (
	id serial,
	login text,
	email text,
	password text,
	register_dttm timestamp,
	usertype_id smallint,
	deleted_flag boolean,
	PRIMARY KEY( id )
);