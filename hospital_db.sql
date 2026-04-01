CREATE DATABASE hospital_db;
USE hospital_db;

CREATE TABLE doctors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  specialization VARCHAR(100)
);


CREATE TABLE slots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  doctor_id INT,
  date DATE,
  time VARCHAR(20),
  is_booked BOOLEAN DEFAULT 0
);


CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  serial_number INT,
  patient_name VARCHAR(100),
  patient_age INT,
  patient_contact VARCHAR(20),
  patient_ailment VARCHAR(255),
  doctor_id INT,
  slot_id INT,
  status VARCHAR(20) DEFAULT 'Pending'
);
SHOW TABLES;