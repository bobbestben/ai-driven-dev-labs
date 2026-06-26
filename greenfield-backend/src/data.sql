CREATE TABLE IF NOT EXISTS pets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  owner_name TEXT NOT NULL
);

INSERT INTO pets (name, owner_name) VALUES ('Buddy', 'Alice Smith');
INSERT INTO pets (name, owner_name) VALUES ('Max', 'Bob Johnson');
INSERT INTO pets (name, owner_name) VALUES ('Luna', 'Alice Smith');
