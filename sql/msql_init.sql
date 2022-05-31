DROP TABLE IF EXISTS players CASCADE;
DROP TABLE IF EXISTS teams CASCADE;
DROP TABLE IF EXISTS teamplayer CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS history CASCADE;

CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    login varchar(20),
    password varchar(40),
    privelegelevel int
);

CREATE TABLE IF NOT EXISTS teams (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar(255),
    description varchar(255),
    owner int,
    FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    firstname varchar(255),
    lastname varchar(255),
    country varchar(255),
    birthdate date,
    owner INT,
    FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS teamplayer (
    teamid int,
    playerid int,
    FOREIGN KEY (teamid) REFERENCES teams (id),
    FOREIGN KEY (playerid) REFERENCES players (id)
);

CREATE TABLE IF NOT EXISTS history (
    id INT PRIMARY KEY AUTO_INCREMENT,
    playerid int,
    teamid int,
    leaved date,
    FOREIGN KEY (teamid) REFERENCES teams (id),
    FOREIGN KEY (playerid) REFERENCES players (id)
);
