-- Drop existing tables to ensure clean schema
DROP TABLE IF EXISTS invoice;
DROP TABLE IF EXISTS visit;
DROP TABLE IF EXISTS vet;
DROP TABLE IF EXISTS pet;
DROP TABLE IF EXISTS owner;

-- Schema for Owner table
CREATE TABLE IF NOT EXISTS owner (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    name    VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL
);

-- Seed data for Owner
INSERT INTO owner (id, name, address) VALUES (1, 'John Smith', '123 Main St');
INSERT INTO owner (id, name, address) VALUES (2, 'Sarah Johnson', '456 Oak Ave');
INSERT INTO owner (id, name, address) VALUES (3, 'Emily Davis', '789 Pine Rd');
INSERT INTO owner (id, name, address) VALUES (4, 'Michael Brown', '321 Elm St');

-- Schema for Pet table
CREATE TABLE IF NOT EXISTS pet (
    id       INTEGER PRIMARY KEY AUTOINCREMENT,
    name     VARCHAR(255) NOT NULL,
    owner_id INTEGER NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES owner(id)
);

-- Seed data for Pet
INSERT INTO pet (name, owner_id) VALUES ('Max', 1);
INSERT INTO pet (name, owner_id) VALUES ('Bella', 2);
INSERT INTO pet (name, owner_id) VALUES ('Charlie', 1);
INSERT INTO pet (name, owner_id) VALUES ('Luna', 3);
INSERT INTO pet (name, owner_id) VALUES ('Rocky', 4);

-- Schema for Vet table
CREATE TABLE IF NOT EXISTS vet (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL
);

-- Test data for Vet
INSERT INTO vet (id, name, specialty) VALUES (1, 'Dr. Sarah Martinez', 'Surgery');
INSERT INTO vet (id, name, specialty) VALUES (2, 'Dr. James Chen', 'Dentistry');
INSERT INTO vet (id, name, specialty) VALUES (3, 'Dr. Emily Rodriguez', 'General Practice');
INSERT INTO vet (id, name, specialty) VALUES (4, 'Dr. Michael Thompson', 'Cardiology');

-- Schema for Visit table
CREATE TABLE IF NOT EXISTS visit (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    date_time TEXT NOT NULL,
    clinic    VARCHAR(255) NOT NULL,
    summary   TEXT NOT NULL,
    pet_id    INTEGER NOT NULL,
    vet_id    INTEGER,
    FOREIGN KEY (pet_id) REFERENCES pet(id),
    FOREIGN KEY (vet_id) REFERENCES vet(id)
);

-- Test data for Visit
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (1, '2025-11-15T09:30:00', 'Downtown Clinic', 'Pre-operative surgical consultation for neutering procedure. Patient examined and deemed healthy for anesthesia. Bloodwork results reviewed and within normal limits. Surgery scheduled for next week. Pre-operative fasting instructions provided to owner.', 1, 1);
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (2, '2025-11-18T14:00:00', 'North Branch', 'Routine wellness examination. All vital signs normal. Dental cleaning performed. Owner educated about dental care at home. No concerns noted.', 1, 3);
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (3, '2025-11-10T10:15:00', 'East Side Clinic', 'Dental examination revealed minor tartar buildup. Professional cleaning completed. Two teeth required extraction due to decay. Post-operative care instructions provided. Pain medication prescribed.', 2, 2);
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (4, '2025-11-20T11:45:00', 'Downtown Clinic', 'Surgical consultation for mass removal. Pre-operative bloodwork ordered. Surgery scheduled for next week. Owner counseled on procedure risks and recovery expectations.', 2, 1);
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (5, '2025-11-12T16:30:00', 'North Branch', 'Presented with lethargy and reduced appetite. Physical examination unremarkable. Bloodwork shows mild dehydration. Subcutaneous fluids administered. Dietary recommendations provided. Recheck in 3 days if symptoms persist.', 3, 3);

-- Schema for Invoice table
CREATE TABLE IF NOT EXISTS invoice (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    invoice_number VARCHAR(255) NOT NULL,
    invoice_date   TEXT NOT NULL,
    amount         DECIMAL(10, 2) NOT NULL,
    visit_id       INTEGER NOT NULL,
    FOREIGN KEY (visit_id) REFERENCES visit(id)
);

-- Test data for Invoice
INSERT INTO invoice (id, invoice_number, invoice_date, amount, visit_id) VALUES (1, 'INV-2025-001', '2025-11-15T09:30:00', 150.00, 1);
INSERT INTO invoice (id, invoice_number, invoice_date, amount, visit_id) VALUES (2, 'INV-2025-002', '2025-11-18T14:00:00', 75.50, 2);
INSERT INTO invoice (id, invoice_number, invoice_date, amount, visit_id) VALUES (3, 'INV-2025-003', '2025-11-10T10:15:00', 300.00, 3);
INSERT INTO invoice (id, invoice_number, invoice_date, amount, visit_id) VALUES (4, 'INV-2025-004', '2025-11-20T11:45:00', 450.00, 4);
INSERT INTO invoice (id, invoice_number, invoice_date, amount, visit_id) VALUES (5, 'INV-2025-005', '2025-11-12T16:30:00', 120.00, 5);

INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (6, '2025-11-22T08:00:00', 'East Side Clinic', 'Routine dental prophylaxis. Moderate periodontal disease noted. Full mouth radiographs taken. One molar extracted. Antibiotic therapy initiated. Home care demonstration completed with owner.', 4, 2);
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (7, '2025-11-17T13:20:00', 'Downtown Clinic', 'Post-operative follow-up after spay surgery. Incision healing well with no signs of infection. Sutures intact. Activity restriction to continue for one more week. Recheck scheduled for suture removal.', 4, 1);
INSERT INTO visit (id, date_time, clinic, summary, pet_id, vet_id) VALUES (8, '2025-11-21T15:00:00', 'North Branch', 'Cardiac evaluation for heart murmur detected during routine exam. Echocardiogram performed showing mild mitral valve insufficiency. No clinical signs of heart failure at this time. Monitoring recommended every 6 months. Owner educated on warning signs.', 4, 4);
