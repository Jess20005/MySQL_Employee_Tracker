const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "Roechling#120",
  database: "employeeDB",
});

connection.connect((err) => {
  if (err) throw err;
  startPrompt();
});

const startPrompt = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employee",
        "Add Department",
        "Add Role",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "View All Employees":
          employees();
          break;

        case "View All Departments":
          department();
          break;

        case "View All Roles":
          role();
          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Add Department":
          addDepartment();
          break;

        case "Add Role":
          addRole();
          break;

        case "Update Employee Role":
          updateEmployee();
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

const employees = () => {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

const department = () => {
  const query = "SELECT * FROM department";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
};

const role = () => {
  const query = "SELECT * FROM role";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
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
      // console.log(answer);
      connection.query(
        {
          sql: "INSERT INTO department (name) VALUES (?)",
          timeout: 40000, // 40s
          values: [answer.department],
        },
        function (err, res, fields) {
          if (err) return err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the new role?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary of the new role?",
      },
      {
        name: "departmentID",
        type: "input",
        message: "What department will the new role be in?",
      },
    ])
    .then((answer) => {
      // console.log(answer);
      connection.query(
        {
          sql: "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
          timeout: 40000, // 40s
          values: [
            answer.title,
            parseInt(answer.salary),
            parseInt(answer.departmentID),
          ],
        },
        function (err, res, fields) {
          if (err) return err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "roleID",
        type: "input",
        message: "What is the new employee's role ID?",
      },
      {
        name: "managerID",
        type: "input",
        message: "What is the new employee's manager ID?",
      },
    ])

    .then((answer) => {
      console.log(answer);
      connection.query(
        {
          sql:
            "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          timeout: 40000, // 40s
          values: [
            answer.firstName,
            answer.lastName,
            parseInt(answer.roleID),
            parseInt(answer.managerID),
          ],
        },
        function (err, res, fields) {
          if (err) return err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function updateEmployee() {
  inquirer
    .prompt({
      name: "employee",
      type: "input",
      message:
        "Which employee would you like to update? (Select employee by ID number)",
    })

    .then((answer) => {
      // console.log(answer);
      connection.query(
        {
          sql:
            "UPDATE employee SET id, first_name, last_name, role_id, manager_id) FROM employee",
          timeout: 40000, // 40s
        },
        function (err, res, fields) {
          if (err) return err;
          console.table(res);
          startPrompt();
        }
      );
    });
}
