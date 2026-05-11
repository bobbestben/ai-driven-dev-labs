CREATE TABLE IF NOT EXISTS pet (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       VARCHAR(50)  NOT NULL,
    owner_name VARCHAR(100) NOT NULL
);

INSERT INTO pet (name, owner_name) VALUES ('Leo',    'George Franklin');
INSERT INTO pet (name, owner_name) VALUES ('Basil',  'Betty Davis');
INSERT INTO pet (name, owner_name) VALUES ('Rosy',   'Eduardo Rodriquez');
INSERT INTO pet (name, owner_name) VALUES ('Jewel',  'Harold Davis');
INSERT INTO pet (name, owner_name) VALUES ('Iggy',   'Peter McTavish');
