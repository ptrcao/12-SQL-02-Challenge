import { CompanyQuery } from "./lib/classes.js";

// var inquirer = require('inquirer');
import inquirer from "inquirer";

// const cTable = require('console.table');
import cTable from "console.table";

// get the client
import mysql from "mysql2";

// get the client
// const mysql = require('mysql2');

// Connect to database
const connection = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db database.`)
);

var companyQueryInstance = new CompanyQuery(connection);


const menuQuestions = [
  {
    name: "mainMenu",
    message: "What would you like to do?",
    type: "list",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "View all employees by manager",
      "View all employees by department",
      "View utilized budget of a department",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Update employee manager",
      "Delete department",
      "Delete role",
      "Delete employee",
      new inquirer.Separator(),
      "Quit",
      new inquirer.Separator(),
    ],
  },
];

async function showMainMenu() {
  try {
    const answers = await inquirer.prompt(menuQuestions);
    console.log(answers.mainMenu);
    switch (answers.mainMenu) {
      case "View all departments":
        await companyQueryInstance.viewTable("department").then((results) => {
          console.table(results[0]);
        });
        await showMainMenu();
        break;
      case "View all roles":
        await companyQueryInstance.viewTable("role").then((results) => {
          console.table(results[0]);
        });
        await showMainMenu();
        break;

      case "View all employees":
        await companyQueryInstance.viewTable("employee").then((results) => {
          console.table(results[0]);
        });
        await showMainMenu();
        break;

      case "View all employees by manager":
        try {
          await companyQueryInstance
            .viewEmployeesByManager()
            .then((results) => {
              console.table(results[0]);
            });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();

        break;

      case "View all employees by department":
        try {
          await companyQueryInstance.viewEmployeesByDept().then((results) => {
            console.table(results[0]);
          });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();

        break;

      case "View utilized budget of a department":
        try {
          var viewDeptUtilizedBudgetAnswers = await inquirer.prompt([
            {
              name: "deptName",
              message:
                "What is the name of the department you wish wish to view the utilized budget for?",
              type: "input",
            },
          ]);

          await companyQueryInstance
            .viewDeptUtilizedBudget(viewDeptUtilizedBudgetAnswers.deptName)
            .then((results) => {
              console.table(results[0]);
            });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();
        break;

      case "Add a department":
        try {
          var addDeptAnswers = await inquirer.prompt([
            {
              name: "deptName",
              message: "What is the name of the department you wish to add?",
              type: "input",
            },
          ]);

          await companyQueryInstance
            .insertRecord("department", [addDeptAnswers.deptName])
            .then((results) => {
              console.log(`Successfully added ${addDeptAnswers.deptName}`);
            });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();
        break;

      case "Add an employee":
        try {
          var addEmployeeAnswers = await inquirer.prompt([
            {
              name: "firstName",
              message: "What is the employee's first name?",
              type: "input",
            },
            {
              name: "lastName",
              message: "What is the employee's last name?",
              type: "input",
            },
            {
              name: "roleId",
              message:
                "What is the employee's role ID? (Hit enter to skip and add this later)",
              type: "input",
            },
            {
              name: "managerId",
              message:
                "What is the employee's Manager's ID? (Hit enter to skip and add this later)",
              type: "input",
            },
          ]);

          await companyQueryInstance
            .insertRecord("employee", [
              addEmployeeAnswers.firstName,
              addEmployeeAnswers.lastName,
              addEmployeeAnswers.roleId,
              addEmployeeAnswers.managerId,
            ])
            .then((results) => {
              console.log(
                `Successfully added ${addEmployeeAnswers.firstName} ${addEmployeeAnswers.lastName}`
              );
            });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();

        break;

      case "Add a role":
        try {
          var addRoleAnswers = await inquirer.prompt([
            {
              name: "title",
              message: "What is the title of the role you wish to add?",
              type: "input",
            },
            {
              name: "salary",
              message: "What is the role salary?",
              type: "input",
            },
            {
              name: "deptId",
              message: "What is the department id?",
              type: "input",
            },
          ]);

          await companyQueryInstance
            .insertRecord("role", [
              addRoleAnswers.title,
              addRoleAnswers.salary,
              addRoleAnswers.deptId,
            ])
            .then((results) => {
              console.log(`Successfully added ${addRoleAnswers.title}`);
            });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();
        break;

      case "Update an employee role":
        await companyQueryInstance
          .viewTable("role")
          .then(async (results) => {
            var rolesArr = [];

            results[0].forEach((result) => {
              rolesArr.push(result.title);
            });

            rolesArr.sort();

            try {
              var updateEmployeeRoleAnswers = await inquirer.prompt([
                {
                  name: "employeeId",
                  message: "What is the employee's ID?",
                  type: "input",
                },
                {
                  name: "newRoleTitle",
                  message: "What is the title of their new role?",
                  type: "list",
                  choices: rolesArr.sort(),
                },
              ]);

              // having the user type the role is problematic due to formatting differences (capitalization and whitespaces) and spelling errors so it's better to return a selectable list

              await companyQueryInstance
                .updateEmployeeRole(
                  updateEmployeeRoleAnswers.employeeId,
                  updateEmployeeRoleAnswers.newRoleTitle
                )
                .then((results) => {
                  console.log(
                    `Employee #${updateEmployeeRoleAnswers.employeeId} has been reassigned to ${updateEmployeeRoleAnswers.newRoleTitle}`
                  );
                });
            } catch (err) {
              console.log(err);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        await showMainMenu();
        break;

      case "Update employee manager":
        try {
          var updateEmployeeManagerAnswers = await inquirer.prompt([
            {
              name: "employeeId",
              message: "What is the employee's ID?",
              type: "input",
            },
            {
              name: "newManagerId",
              message: "What is their new manager's ID?",
              type: "input",
            },
          ]);
          console.log(
            "updateEmployeeManagerAnswers.employeeId: " +
              updateEmployeeManagerAnswers.employeeId
          );
          console.log(
            "updateEmployeeManagerAnswers.newManagerId: " +
              updateEmployeeManagerAnswers.newManagerId
          );
          // updateColValue(recordId, tableName, colToUpdate, newValue)
          await companyQueryInstance
            .updateColValue(
              updateEmployeeManagerAnswers.employeeId,
              "employee",
              "manager_id",
              updateEmployeeManagerAnswers.newManagerId
            )
            .then((results) => {
              console.log(
                `Employee #${updateEmployeeManagerAnswers.employeeId} has been reassigned to manager #${updateEmployeeManagerAnswers.newManagerId}`
              );
            });
        } catch (err) {
          console.log(err);
        }

        await showMainMenu();

        break;

      case "Delete department":
        try {
          const deleteDeptRecordAnswers = await inquirer.prompt([
            {
              name: "deptId",
              message:
                "What is the unque ID of the department that you wish to delete?",
              type: "input",
            },
          ]);
          await companyQueryInstance
            .deleteRecord("department", deleteDeptRecordAnswers.deptId)
            .then((results) => {
              console.log(
                `Successfully deleted department where id = ${deleteDeptRecordAnswers.deptId}`
              );
            });
        } catch (err) {
          console.log(err);
        }
        await showMainMenu();
        break;

      case "Delete role":
        try {
          const deleteRoleRecordAnswers = await inquirer.prompt([
            {
              name: "roleId",
              message:
                "What is the unque ID of the role that you wish to delete?",
              type: "input",
            },
          ]);
          await companyQueryInstance
            .deleteRecord("role", deleteRoleRecordAnswers.roleId)
            .then((results) => {
              console.log(
                `Successfully deleted role where id = ${deleteRoleRecordAnswers.roleId}`
              );
            });
        } catch (err) {
          console.log(err);
        }
        await showMainMenu();
        break;

      case "Delete employee":
        try {
          const deleteEmployeeRecordAnswers = await inquirer.prompt([
            {
              name: "employeeId",
              message:
                "What is the unque ID of the employee that you wish to delete?",
              type: "input",
            },
          ]);
          await companyQueryInstance
            .deleteRecord("employee", deleteEmployeeRecordAnswers.employeeId)
            .then((results) => {
              console.log(
                `Successfully deleted employee where id = ${deleteEmployeeRecordAnswers.employeeId}`
              );
            });
        } catch (err) {
          console.log(err);
        }
        await showMainMenu();
        break;

      case "Quit":
        console.log("Exited... Goodbye.");
        process.exit();
        break;
    }
  } catch (error) {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  }
}

showMainMenu();
