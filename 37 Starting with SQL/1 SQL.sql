CREATE DATABASE IF NOT EXISTS college;
USE college;

CREATE TABLE student(
    rolno INT,
    name VARCHAR(30),
    age INT
);

INSERT INTO student
VALUES
(121, "ayushamn", 21),
(122, "aman", 20),
(125, "ankit",22);

SELECT * FROM student 
WHERE age>20;