/* 
    Prototypal Inheritence
        ONE object acts as the base object for a family of objects
    Prototype Hopping
        The process of resolving an attribute by tracing the [[prototype]] chain
    IMPORTANT:
        prototype hopping happens ONLY when an attribute value is READ
        NO prototype hopping occurs when a new value is assigned (WRITE)
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
Employee.prototype.print = function () {
  console.log("Employee : ", this.id, this.name, this.salary);
};
