-- INSERT INTO department (id, name)
-- VALUES (1, "Executive"),
--        (2, "Accounting"),
-- 	   (3, "Sales"),
--        (4, "Admin");

-- INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
-- VALUES (1, "Michael", "Scott", 1, NULL),
--        (2, "Dwight", "Schrute", 4, 1),
--        (3, "Jim", "Halpert", 4, 1),
--        (4, "Pam", "Beesly", 5, 1),
--        (5, "Ryan", "Howard", 3, 1),
--        (6, "Andy", "Bernard", 4, 1),
--        (7, "Robert", "California", 1, NULL),
--        (8, "Stanley", "Hudson", 5, 7),
--        (9, "Kevin", "Malone", 5, 7),
--        (10, "Meredith", "Palmer", 2, 7),
--        (11, "Angela", "Martin", 3, NULL),
--        (12, "Oscar", "Martinez", 5, 11),
--        (13, "Phyllis", "Vance/Lappin",4, 11),
--        (14, "Roy", "Anderson", 3, 11),
--        (15, "Jan", "Levinson", 2, 11);

-- INSERT INTO role (id, title, salary, department_id)
-- VALUES (1, "Manager", "120000", 1),
--        (2, "Accountant", "70000", 2),
--        (3, "Bookkeeper", "60000", 2),
--        (4, "Salesperson", "60000", 4),
--        (5, "Secretary", "55000", 5),
--        (6, "Receptionist", "50000", 5);


INSERT INTO department (name)
VALUES ("Executive"),
       ("Accounting"),
	   ("Sales"),
       ("Admin");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 120000.00, 1),
       ("Accountant", 70000.00, 2),
       ("Bookkeeper", 60000.00, 2),
       ("Salesperson", 60000.00, 3),
       ("Secretary", 55000.00, 4),
       ("Receptionist", 50000.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "Scott", 1, NULL),
       ("Dwight", "Schrute", 2, 1),
       ("Jim", "Halpert", 2, 1),
       ("Pam", "Beesly", 3, 1),
       ("Ryan", "Howard", 4, 1),
       ("Andy", "Bernard", 2, 1),
       ("Robert", "California", 1, NULL),
       ("Stanley", "Hudson", 3, 7),
       ("Kevin", "Malone", 3, 7),
       ("Meredith", "Palmer", 5, 7),
       ("Angela", "Martin", 4, NULL),
       ("Oscar", "Martinez", 3, 11),
       ("Phyllis", "Vance/Lappin", 2, 11),
       ("Roy", "Anderson", 4, 11),
       ("Jan", "Levinson", 5, 11);