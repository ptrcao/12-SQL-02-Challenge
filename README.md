
# Employee Management System

![license](https://img.shields.io/static/v1?label=license&message=No_license&color=blue&style=for-the-badge)

  Built with:

  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

> Video demo URL #1: https://youtu.be/_mwBTF4df1Q
> Video demo URL #2: https://youtu.be/y_HOktH1PxY

> Repository URL: https://api.github.com/repos/ptrcao/12-SQL-02-Challenge

## Table of Contents

- [Project Description](#project-description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributions](#contributions)
- [Tests](#tests)
- [Credits](#credits)
- [License](#license)


## Project Description
This is a Node.js command line application that enables an employer to manage their employee data. The application uses the mysql2 module to connect to a MySQL database to perform CRUD operations on employee data. The user can access different functionalities through a menu interface generated using the inquirer module.

### Features
The following features are currently available in the application:

* View all departments, roles, and employees
* View all employees by manager
* View all employees by department
* View the utilized budget of a department
* Add a department, role, or employee
* Update an employee's role or manager
* Delete a department, role, or employee

## Installation

### Requirements
* Node.js
* MySQL

1. Clone the repository using the command:
```
git clone https://github.com/example/employee-management-system.git
```

2. Install dependencies using the command:

```
npm install
```


3. Create a MySQL database named employees_db and set database tables by running the schema.sql script located in the root directory of the application. This can be done by running the following command in the MySQL shell:

```
source schema.sql
```


4. (Optional) If you want to add some test data to the database, you can run the seeds.sql script located in the root directory of the application. This can be done by running the following command in the MySQL shell:

```
source seeds.sql
```

## Usage
To start the application, navigate to the root directory of the application in your terminal and run the following command:

```
node index
```
This will display a menu interface where you can select different options to manage employee data.




## Tests
N/A

## Contributions
Contributions are welcome. If you find a bug or have a feature request, please open an issue first to discuss your ideas. If you would like to contribute to the code, please fork the repository and submit a pull request.

## Credits
- PC

## License
No license specified
