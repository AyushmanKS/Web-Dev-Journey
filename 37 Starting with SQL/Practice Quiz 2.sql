create table if not exists student(
	rollno int primary key,
    name varchar(20),
    city varchar(10),
    marks int
);

insert into student
(rollno, name, city, marks)
values
(110, "Ayushman","Kanpur",44),
(112, "Ayush","Kanpur",45),
(114, "Aman","jaipur",38);

select * from student
where marks > 40;

select distinct city, max(marks)
from student
group by city;

alter table student
add column grade varchar(2);

update student
set grade = "A"
where marks > 40;

update student
set grade = "B"
where marks < 40;

SET SQL_SAFE_UPDATES = 0;


select * from student;