-- Create the database
DROP DATABASE IF EXISTS phoenix_db;

CREATE DATABASE phoenix_db;

\c phoenix_db;

-- Create the teams table
DROP TABLE IF EXISTS teams;

CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL, 
    external_id INT UNIQUE NOT NULL
);

-- Create the variations table
DROP TABLE IF EXISTS keywords;


CREATE TABLE IF NOT EXISTS keywords (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL UNIQUE
);

-- Create the intermediary table to represent the many-to-many relationship between teams and variations
DROP TABLE IF EXISTS team_keywords;

CREATE TABLE IF NOT EXISTS team_keywords (
    team_id INT REFERENCES teams (external_id),
    keyword_id INT REFERENCES keywords (id),
    PRIMARY KEY (team_id, keyword_id)
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    clerk_user_id VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS user_teams (
    user_id INT REFERENCES users(id),
    team_id INT REFERENCES teams(external_id),
    is_blocked BOOLEAN DEFAULT false,    
    PRIMARY KEY (user_id, team_id)
);