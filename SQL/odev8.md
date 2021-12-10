Soru 1:
- CREATE TABLE employee(
	id SERIAL PRIMARY KEY,
	name varchar(50) NOT NULL,
	birthday DATE,
	email varchar(100)
)

Soru 2:
- insert into employee (name, birthday, email) values ('Felisha Truelock', '1987-12-31', 'ftruelock0@bluehost.com');
- ...
- ...

Soru 3:
- UPDATE employee SET birthday = '1991-03-09' WHERE birthday IS NULL;
- UPDATE employee SET name = 'UPDATED EMPLOYEE' WHERE name LIKE 'J%';
- UPDATE employee SET birthday = '2000-01-01' WHERE birthday > '2005-01-01';
- UPDATE employee SET email = 'employee@company.com' WHERE email IS NULL;
- UPDATE employee SET name = 'Eddie' WHERE name LIKE 'Edd%';

Soru 4:
- DELETE FROM employee WHERE name LIKE 'E%';
- DELETE FROM employee WHERE id IN (11, 12, 15);
- DELETE FROM employee WHERE birthday = '1995-03-01';
- DELETE FROM employee WHERE email LIKE 'b%';
- DELETE FROM employee WHERE id = 24;
