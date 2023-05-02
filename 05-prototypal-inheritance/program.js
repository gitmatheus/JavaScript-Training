// https://github.com/tkmagesh/Salesforce-AdvJs-May-2023/blob/main/05-prototypal-inheritence/program.js

// Prototypal Inheritance
// One object acts as the base object for a family of objects

/* 
    Constructor function (class like)
        - No syntax difference
        - Invoked using the 'new' keyword
            * this => new object
            * this => returned by default
        - Convention : the function name starts with an uppercase
*/

function Employee(id, name, salary) {
  // if the function is not invoked using the 'new' keyword
  if (!(this instanceof Employee)) {
    return new Employee(id, name, salary);
  }
  // this => new object
  this.id = id;
  this.name = name;
  this.salary = salary;
  // this => returned by default
}

// Adds a function to the Employee prototype
// So the function is create once, and available to all instances
Employee.prototype.print = function () {
  console.log("Employee: ", this.id, this.name, this.salary);
};

var emp = new Employee(100, "Magesh", 10000);
emp.print();
