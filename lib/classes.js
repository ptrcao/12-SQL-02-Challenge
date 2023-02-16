// classes.js -> queries.js

// use promises with a class
export class CompanyQuery {
  constructor(connection) {
    this.connection = connection;
  }

  // METHODS 

  // VIEW TABLE
  viewTable(tableName) {
    // Table names are: role, employee, department
    return this.connection.promise().query(`SELECT * FROM ${tableName}`);
  }

  // INSERT RECORD TO TABLES
  // 3 separate functions for each table having different arguments
//   insertDeptRecord(deptName) {
//     return this.connection
//       .promise()
//       .query(`INSERT INTO department (name) VALUES ('${deptName}')`);
//   }
//   insertRoleRecord(title, salary, department_id) {
//     return this.connection
//       .promise()
//       .query(`INSERT INTO role (title,salary,department_id) VALUES ('${title}','${salary}','${department_id}')`);
//   }
  insertRecord(tableName, valuesArray) {
    if (!Array.isArray(valuesArray)) {
        throw new Error("The second argument is required to be an array!");
      }

      const modifiedArray = valuesArray.map(val => `'${val}'`);

    return this.connection
      .promise()
        .query(`INSERT INTO ${tableName} VALUES (NULL,${modifiedArray.join(',')})`);
  }

//   insertRecord(tableName, ...valuesArray) {
//     return this.connection
//       .promise()
//         .query(`INSERT INTO ${tableName} ('${valuesArray.join("','")}')`);
//   }


  // update employee role
  updateEmployeeRole(employeeId, newRoleTitle) {
    return this.connection
      .promise()
      .query(`UPDATE employee
      SET role_id = (
          SELECT id FROM \`role\` WHERE title = '${newRoleTitle}'
      )
      WHERE id = '${employeeId}';`)
  }

  // update employee manager
  updateEmployeeManager(employeeId, newManagerId) {
    return this.connection
      .promise()
      .query(  `UPDATE employee
      SET manager_id = ${newManagerID}
      WHERE id = ${employeeId};`);
  }

    // Universal updateColValue for a particular record
    // Used for: update employee manager
    updateColValue(recordId, tableName, colToUpdate, newValue) {
        return this.connection
          .promise()
          .query(  `UPDATE ${tableName}
          SET ${colToUpdate} = ${newValue}
          WHERE id = ${recordId};`);
      }

  // delete

  deleteRecord(tableName, recordId) {
    return this.connection
      .promise()
      .query(`DELETE FROM ${tableName} WHERE id = ${recordId}`);
  }

//   deleteEmployeeRecord(employeeId) {
//     return this.connection
//       .promise()
//       .query(`DELETE FROM employee WHERE id = ${employeeId}`);
//   }

//   deleteRoleRecord(roleId) {
//     return this.connection
//       .promise()
//       .query(`DELETE FROM role WHERE id = ${roleId}`);
//   }

//   deleteDeptRecord(deptId) {
//     return this.connection
//       .promise()
//       .query(`DELETE FROM department WHERE id = ${deptId}`);
//   }



// View employees by manager
viewEmployeesByManager() {
    return this.connection
      .promise()
      .query(`SELECT m.id AS manager_id, concat(m.first_name, ' ', m.last_name) AS manager_full_name,
      e.id AS employee_id, e.first_name AS employee_first_name, e.last_name AS employee_last_name
FROM employee e
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY manager_id;`);
  }

// View employees by dept
  viewEmployeesByDept() {
    return this.connection
      .promise()
      .query(`SELECT department.name AS department_name, employee.first_name, employee.last_name
      FROM employee
      JOIN role ON employee.role_id = role.id
      JOIN department ON role.department_id = department.id
      ORDER BY department_name, last_name, first_name;`);
  }

// viewDeptUtilizedBudget
// select the salaries of the roles of all employees with a role in a given department
viewDeptUtilizedBudget(departmentName) {
    return this.connection
      .promise()
      .query(`
      SELECT d.name, SUM(r.salary) FROM 
employee e
JOIN \`role\` r
on e.role_id = r.id
JOIN department d
on r.department_id = d.id
WHERE d.name = "${departmentName}"
GROUP BY d.name`);

// If the WHERE clause is guaranteed to only return one row for the specified department name, then technically the GROUP BY clause is not strictly necessary to get the desired result. However, adding a GROUP BY clause is still a good practice for two reasons:

// Clarity: Using a GROUP BY clause makes it clear that the intention of the query is to group the results by department name and to perform an aggregate function (SUM()) on the salaries. This makes the query more understandable and maintainable.

// Future-proofing: Even if the current data only includes one row per department name, there is no guarantee that this will always be the case. If the data changes in the future to include multiple rows per department name, the query without the GROUP BY clause would produce incorrect results, while the query with the GROUP BY clause would continue to produce correct results.

// So, in general, it's a good practice to include a GROUP BY clause whenever you are using aggregate functions like SUM() or COUNT() in your SQL queries.

// src: ChatGPT
}

}