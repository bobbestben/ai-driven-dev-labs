CREATE TABLE IF NOT EXISTS pet (
    id BIGINT IDENTITY PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_name VARCHAR(255) NOT NULL
);

INSERT INTO pet (name, owner_name) VALUES 
('Buddy', 'John Smith'),
('Max', 'Jane Doe'),
('Bella', 'Mike Johnson');
