
CREATE TABLE users (
    user_id serial PRIMARY KEY,
    username VARCHAR(25),
    email TEXT,
    password VARCHAR,
    last_login TIMESTAMP,
    created TIMESTAMP
);

CREATE TABLE userships (
    item_id serial PRIMARY KEY,
    owner_id INTEGER,
    name VARCHAR(25),
    powerpoints INTEGER,
    body_id INTEGER,
    weapons_id INTEGER[],
    generators_id INTEGER[],
    engines_id INTEGER[],
    creator_id INTEGER,
    created TIMESTAMP
);

CREATE TABLE shipbody (
    item_id serial PRIMARY KEY,
    name VARCHAR(25),
    powerpoints INTEGER,
    capacity INTEGER,
    size INTEGER,
    hp INTEGER,
    energyneed INTEGER,
    creator_id INTEGER,
    created TIMESTAMP
);

CREATE TABLE weapons (
    item_id serial PRIMARY KEY,
    name VARCHAR(25),
    isactive BOOLEAN,
    powerpoints INTEGER,
    size INTEGER,
    hp INTEGER,
    energyneed INTEGER,
    damage INTEGER,
    accuracy INTEGER,
    maxdistance INTEGER,
    bestdistance INTEGER,
    reload INTEGER,
    type varchar(25),
    creator_id INTEGER,
    created TIMESTAMP
);

CREATE TABLE generators (
    item_id serial PRIMARY KEY,
    name VARCHAR(25),
    isactive BOOLEAN,
    powerpoints INTEGER,
    size INTEGER,
    hp INTEGER,
    energy INTEGER,
    creator_id INTEGER,
    created TIMESTAMP
);

CREATE TABLE engines (
    item_id serial PRIMARY KEY,
    name VARCHAR(25),
    isactive BOOLEAN,
    powerpoints INTEGER,
    capacity INTEGER,
    size INTEGER,
    hp INTEGER,
    energyneed INTEGER,
    maxspeed INTEGER,
    mobility INTEGER,
    creator_id INTEGER,
    created TIMESTAMP
);

CREATE TABLE modules (
    item_id serial PRIMARY KEY,
    name VARCHAR(25),
    isactive BOOLEAN,
    powerpoints INTEGER,
    size INTEGER,
    hp INTEGER,
    energyneed INTEGER,
    type VARCHAR(25),
    creator_id INTEGER,
    created TIMESTAMP
);

DROP TABLE engines;
DROP TABLE generators;
DROP TABLE modules;
DROP TABLE shipbody;
DROP TABLE users;
DROP TABLE userships;
DROP TABLE weapons;