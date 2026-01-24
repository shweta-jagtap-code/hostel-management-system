-- ===============================
-- Hostel Management Database
-- ===============================

DROP DATABASE IF EXISTS hostel_db;
CREATE DATABASE hostel_db;
USE hostel_db;

-- -------------------------------
-- USERS TABLE
-- -------------------------------
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role ENUM('ADMIN','WARDEN','COOK','SECURITY','CLEANER') NOT NULL
);

-- -------------------------------
-- STUDENTS TABLE
-- -------------------------------
CREATE TABLE students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_no VARCHAR(50) UNIQUE NOT NULL,
    room_no VARCHAR(10) NOT NULL,
    course VARCHAR(100),
    hostel_block VARCHAR(10)
);

-- -------------------------------
-- SAMPLE USERS
-- -------------------------------
INSERT INTO users (username, password, role) VALUES
('admin', 'admin123', 'ADMIN');

-- -------------------------------
-- SAMPLE STUDENTS
-- -------------------------------
INSERT INTO students (name, contact_no, room_no, course, hostel_block) VALUES
`('Rahul Sharma', '9511259122', '101', 'Computer Science', 'A'),
('Neha Patil', '9766186989', '102', 'Information Technology', 'B'),
('Amit Verma', '9657119144', '103', 'Mechanical', 'C');`

-- -------------------------------
-- VERIFY DATA (OPTIONAL)
-- -------------------------------
SELECT * FROM users;
SELECT * FROM students;
