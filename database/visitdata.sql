CREATE TABLE IF NOT EXISTS visitdata(
	id serial,
	visit_id int NOT NULL,
	overviewform_id int NOT NULL,
	value text NOT NULL,
	CONSTRAINT visitdata_idx UNIQUE (visit_id, overviewform_id)
)