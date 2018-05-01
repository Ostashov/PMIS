CREATE TABLE IF NOT EXISTS patientsdocuments (
	id serial,
	patient_id int,
	documenttype_id int,
  document_number text,
	deleted_flag boolean
);