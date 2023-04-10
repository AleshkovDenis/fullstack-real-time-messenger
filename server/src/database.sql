CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(25) NOT NULL UNIQUE,
    password VARCHAR(25) NOT NULL,
);

INSERT INTO users(username, password) values($1, $2)