CREATE TABLE IF NOT EXISTS patients (
	id serial,
	firstname text SET NOT NULL,
	lastname text SET NOT NULL,
  middlename text,
  birthdate date,
	deleted_flag boolean,
	PRIMARY KEY( id )
);

-- insert into patients(firstname, lastname, middlename, birthdate, deleted_flag)
-- values('Иван', 'Иванов', 'Иванович', '1988-01-14', false)