create database if not exists college;

use college;

create table teacher (
	id int primary key,
    name varchar(20),
    subject varchar(30),
    salary int
);

insert into teacher 
(id, name, subject, salary)
values 
(23, "ajay", "math", 50000),
(47, "bharat", "english", 60000),
(18, "chetan", "chemistry", 45000),
(9, "divya", "physics", 75000);

select * from teacher;

select * from teacher
where salary > 55000;

alter table teacher
change column salary ctc int; 