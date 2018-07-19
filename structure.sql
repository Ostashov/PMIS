CREATE TABLE public.documenttype_dct
(
    id integer NOT NULL DEFAULT nextval('documenttype_dct_id_seq'::regclass),
    title text COLLATE pg_catalog."default",
    title_eng text COLLATE pg_catalog."default",
    deleted_flag boolean
);

CREATE TABLE public.patients
(
    id integer NOT NULL DEFAULT nextval('patients_id_seq'::regclass),
    firstname text COLLATE pg_catalog."default" NOT NULL,
    lastname text COLLATE pg_catalog."default" NOT NULL,
    middlename text COLLATE pg_catalog."default",
    birthdate date,
    deleted_flag boolean,
    CONSTRAINT patients_pkey PRIMARY KEY (id)
);

CREATE TABLE public.patientsdocuments
(
    id integer NOT NULL DEFAULT nextval('patientsdocuments_id_seq'::regclass),
    patient_id integer,
    documenttype_id integer,
    document_number text COLLATE pg_catalog."default",
    deleted_flag boolean
);

CREATE TABLE public.specialists
(
    id integer NOT NULL DEFAULT nextval('specialists_id_seq'::regclass),
    user_id integer NOT NULL DEFAULT nextval('specialists_user_id_seq'::regclass),
    firstname text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    birthdate date,
    deleted_flag boolean,
    CONSTRAINT specialists_pkey PRIMARY KEY (id)
);

CREATE TABLE public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    register_dttm timestamp without time zone,
    usertype_id smallint,
    deleted_flag boolean,
    firstname text COLLATE pg_catalog."default",
    lastname text COLLATE pg_catalog."default",
    last_login_attempt timestamp without time zone,
    login_attempts smallint,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT email_idx UNIQUE (email)
);

CREATE TABLE public.usertypes_dct
(
    id integer NOT NULL DEFAULT nextval('usertypes_dct_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    name_eng text COLLATE pg_catalog."default",
    deleted_flag boolean,
    CONSTRAINT usertypes_dct_pkey PRIMARY KEY (id)
);

CREATE TABLE public.visitdata
(
    id integer NOT NULL DEFAULT nextval('visitdata_id_seq'::regclass),
    visit_id integer NOT NULL,
    visitform_id integer NOT NULL,
    value text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT visitdata_idx UNIQUE (visit_id, visitform_id)
);

CREATE TABLE public.visitform_dct
(
    id integer NOT NULL DEFAULT nextval('visitform_dct_id_seq'::regclass),
    name text COLLATE pg_catalog."default",
    description text COLLATE pg_catalog."default",
    section text COLLATE pg_catalog."default",
    "order" smallint,
    CONSTRAINT name_idx UNIQUE (name)
);

CREATE TABLE public.visits
(
    id integer NOT NULL DEFAULT nextval('visits_id_seq'::regclass),
    specialist_id integer NOT NULL,
    patient_id integer NOT NULL,
    start_dttm timestamp without time zone NOT NULL,
    end_dttm timestamp without time zone NOT NULL,
    deleted_flag boolean,
    isfirst boolean,
    CONSTRAINT visits_pkey PRIMARY KEY (id)
);