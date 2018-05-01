CREATE TABLE IF NOT EXISTS users (
	id serial,
	email text,
	firstname text,
	lastname text,
	password text,
	register_dttm timestamp,
	usertype_id smallint,
	deleted_flag boolean,
	login_attempts smallint,
	last_login_attempt date,
	CONSTRAINT users_pkey PRIMARY KEY (id),
	CONSTRAINT email_idx UNIQUE (email)
);