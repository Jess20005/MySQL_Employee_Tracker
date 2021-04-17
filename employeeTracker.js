const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "",
  database: "employeeDB",
});

connection.connect((err) => {
  if (err) throw err;
  runSearch();
});

const startPrompt = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          employees();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Update Employee Role":
          updateEmployee();
          break;

        case "View All Roles":
          role();
          break;

        case "Add Role":
          addRole();
          break;

        case "View All Departments":
          department();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Update Manager Role":
          updateManager();
          break;

        case "Exit":
          connection.end();
          break;

        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};

const department = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    console.log(`DEPARTMENTS:`);
    if (err) throw err;
    res.forEach(({ department }) =>
      console.log(`ID: ${department.id} | Name: ${department.name}`)
    );
    startPrompt();
  });
};

const role = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`ROLES:`);
    res.forEach(({ role }) =>
      console.log(
        `ID: ${role.id} | Title: ${role.title} | Salary: ${role.salary} | Department ID: ${role.department_id}`
      )
    );
    startPrompt();
  });
};

const employees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log(`EMPLOYEE:`);
    res.forEach(({ employees }) =>
      console.log(
        `ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role ID: ${employee.role_id} | Manager ID: ${employee.manager_id}`
      )
    );
    startPrompt();
  });
};

function addDepartment() {
  inquirer
    .prompt({
      name: "department",
      type: "input",
      message: "What is the name of the new department?",
    })
    .then((answer) => {
      const query = "INSERT INTO department (name) VALUES ( ? )";
      connection.query(query, answer.department, (err, res) => {
        if (err) throw err;
        console.log(
          `You have added this department: ${answer.department.toUpperCase()}.`
        );
        startPrompt();
      });
    });
}


console.log(`You have added this department: ${(answer.department).toUpperCase()}.`)