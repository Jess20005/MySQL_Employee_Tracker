USE employeeDB;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Legal"), ("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Lead Engineer", 150000, 2), ("Legal Team Lead", 250000, 3),("Accountant", 125000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Ashley", "Rodriguez", 2, NULL), ("John", "Doe", 1, NULL ),
       ("Mike", "Chan", 1, 2), ("Kevin", "Tupik", 2, 1 ),
       ("Kunal", "Singh", 4, NULL), ("Malia", "Brown", 4, 5 ),
       ("Sarah", "Lourd", 3, NULL), ("Tom", "Allen", 3, 7 );