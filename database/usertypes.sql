CREATE TABLE IF NOT EXISTS usertypes_dct (
	id serial,
	name text,
	name_eng text,
	deleted_flag boolean,
	PRIMARY KEY( id )
);