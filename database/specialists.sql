CREATE TABLE IF NOT EXISTS specialists (
	id serial,
  user_id serial,
	firstname text,
	lastname text,
  birthdate date,
	deleted_flag boolean,
	PRIMARY KEY( id )
);