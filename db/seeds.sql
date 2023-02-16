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