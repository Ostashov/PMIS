CREATE TABLE IF NOT EXISTS visits (
	id serial,
	specialist_id int SET NOT NULL,
	patient_id int SET NOT NULL,
  start_dttm timestamp SET NOT NULL,
  end_dtt timestamp SET NOT NULL,
	PRIMARY KEY( id )
);