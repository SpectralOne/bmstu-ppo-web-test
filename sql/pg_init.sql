DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS teamplayer CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS history CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id serial primary key,
    login varchar,
    password varchar,
    privelegelevel int
);

CREATE TABLE IF NOT EXISTS teams (
    id serial primary key,
    name varchar,
    description varchar,
    owner int,
    FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS players (
    id serial primary key,
    firstname varchar,
    lastname varchar,
    country varchar,
    birthdate date,
    owner int,
    FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS teamplayer (
    teamid int,
    playerid int,
    FOREIGN KEY (teamid) REFERENCES teams (id),
    FOREIGN KEY (playerid) REFERENCES players (id)
);

CREATE TABLE IF NOT EXISTS history (
    id serial primary key,
    playerid int,
    teamid int,
    leaved date,
    FOREIGN KEY (teamid) REFERENCES teams (id),
    FOREIGN KEY (playerid) REFERENCES players (id)
);
