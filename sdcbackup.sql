--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-04-12 12:13:05 EDT

-------------------- CREATE AND USE DATABASE --------------------

-- DROP DATABASE sdc;
-- CREATE DATABASE sdc;
-- THESE STATEMENTS ARE FAILING... CREATE NEW DATABASE AND USE IT BEFORE LOADINGING SCHEMA

-------------------- CREATE CHARACTERISTICS TABLE --------------------

CREATE TABLE public.characteristic (
    characteristic_id integer NOT NULL,
    char_name_id integer,
    value jsonb
);

ALTER TABLE public.characteristic OWNER TO administrator;

CREATE SEQUENCE characteristic_characteristic_id_seq;
SELECT setval('characteristic_characteristic_id_seq', 3374748);
ALTER TABLE characteristic ALTER COLUMN characteristic_id SET DEFAULT
nextval('characteristic_characteristic_id_seq'::regclass);

-------------------- CREATE CHARACTERISTIC_NAMES TABLE --------------------

CREATE TABLE public.characteristic_names (
    char_name_id integer NOT NULL,
    name character varying(60) NOT NULL
);

ALTER TABLE public.characteristic_names OWNER TO administrator;

CREATE SEQUENCE characteristic_names_char_name_id_seq;
SELECT setval('characteristic_names_char_name_id_seq', 6);
ALTER TABLE characteristic_names ALTER COLUMN char_name_id SET DEFAULT
nextval('characteristic_names_char_name_id_seq'::regclass);

-------------------- CREATE CHARACTERISTIC_SET TABLE --------------------

CREATE TABLE public.characteristic_set (
    product_id integer,
    characteristic_id integer
);

ALTER TABLE public.characteristic_set OWNER TO administrator;

-------------------- CREATE PHOTOS TABLE --------------------

CREATE TABLE public.photos (
    review_id integer NOT NULL,
    photos jsonb
);

ALTER TABLE public.photos OWNER TO administrator;

CREATE SEQUENCE photos_review_id_seq;
SELECT setval('photos_review_id_seq', 5777922);
ALTER TABLE photos ALTER COLUMN review_id SET DEFAULT
nextval('photos_review_id_seq'::regclass);

-------------------- CREATE PRODUCT_METADATA TABLE --------------------

CREATE TABLE public.product_metadata (
    product_id integer NOT NULL,
    ratings jsonb,
    recommended jsonb
);

ALTER TABLE public.product_metadata OWNER TO administrator;

CREATE SEQUENCE product_metadata_product_id_seq;
SELECT setval('product_metadata_product_id_seq', 1000010);
ALTER TABLE product_metadata ALTER COLUMN product_id SET DEFAULT
nextval('product_metadata_product_id_seq'::regclass);

-------------------- CREATE PRODUCT_REVIEWS TABLE --------------------

CREATE TABLE public.product_reviews (
    review_id integer NOT NULL,
    product_id integer NOT NULL
);

ALTER TABLE public.product_reviews OWNER TO administrator;

-------------------- CREATE PRODUCTS TABLE --------------------

CREATE TABLE public.products (
    product_id integer NOT NULL
);

ALTER TABLE public.products OWNER TO administrator;

-------------------- CREATE REVIEWS TABLE --------------------

CREATE TABLE public.reviews (
    review_id integer NOT NULL,
    rating integer,
    summary character varying(1000),
    response character varying(1000),
    body character varying(1000),
    reviewer_name character varying(60),
    reviewer_email character varying(60),
    helpfulness integer,
    reported character varying,
    date character varying,
    recommend character varying
);

ALTER TABLE public.reviews OWNER TO administrator;

CREATE SEQUENCE reviews_review_id_seq;
SELECT setval('reviews_review_id_seq', 5777922);
ALTER TABLE reviews ALTER COLUMN review_id SET DEFAULT
nextval('reviews_review_id_seq'::regclass);

-------------------- CREATE PRIMARY KEY CONSTRAINTS --------------------

ALTER TABLE ONLY public.characteristic_names ADD CONSTRAINT characteristic_names_pkey PRIMARY KEY (char_name_id);
ALTER TABLE ONLY public.characteristic ADD CONSTRAINT characteristic_pkey PRIMARY KEY (characteristic_id);
ALTER TABLE ONLY public.product_metadata ADD CONSTRAINT product_metadata_pkey PRIMARY KEY (product_id);
ALTER TABLE ONLY public.products ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);
ALTER TABLE ONLY public.reviews ADD CONSTRAINT reviews_pkey PRIMARY KEY (review_id);

-------------------- GRANT TABLE PERMISSIONS TO PROGRAAM USER --------------------

GRANT ALL ON TABLE public.characteristic TO hackreactor;
GRANT ALL ON TABLE public.characteristic_names TO hackreactor;
GRANT ALL ON TABLE public.characteristic_set TO hackreactor;
GRANT ALL ON TABLE public.photos TO hackreactor;
GRANT ALL ON TABLE public.product_metadata TO hackreactor;
GRANT ALL ON TABLE public.product_reviews TO hackreactor;
GRANT ALL ON TABLE public.products TO hackreactor;
GRANT ALL ON TABLE public.reviews TO hackreactor;


-- Completed on 2020-04-12 12:13:05 EDT

--
-- PostgreSQL database dump complete
--

CREATE INDEX reviews_index ON reviews (review_id);
CREATE INDEX products_index ON products (product_id);
CREATE INDEX product_reviews_index ON product_reviews (product_id, review_id);
CREATE INDEX product_metadata_index ON product_metadata (product_id);
CREATE INDEX photos_index ON photos (review_id);
CREATE INDEX characteristic_index ON characteristic (characteristic_id);