CREATE TABLE races (
    race_id   SERIAL PRIMARY KEY,
    race_name VARCHAR(150) NOT NULL,
    description TEXT,
    race_date DATE NOT NULL,
    map_link TEXT
);
