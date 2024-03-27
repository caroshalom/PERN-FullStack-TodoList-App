CREATE DATABASE bdtest;

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false
);
