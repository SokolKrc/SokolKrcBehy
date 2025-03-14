CREATE TABLE runners (
    runner_id    SERIAL PRIMARY KEY,
    first_name   VARCHAR(100) NOT NULL,
    last_name    VARCHAR(100) NOT NULL,
    club         VARCHAR(100),
    gender       CHAR(1) CHECK (gender IN ('M','F')),
    year_of_birth SMALLINT CHECK (year_of_birth BETWEEN 1900 AND 2100)
);
