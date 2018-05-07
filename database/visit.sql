CREATE TABLE IF NOT EXISTS visits (
	id serial,
	specialist_id int NOT NULL,
	patient_id int NOT NULL,
  start_dttm timestamp NOT NULL,
  end_dttm timestamp NOT NULL,
	deleted_flag boolean,
	PRIMARY KEY( id )
);