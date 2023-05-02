// http://es6-features.org/#Constants
/* 
1. let
2. const
3. array destructuring
4. rest operator (array)
5. spread operator (array)
6. object destructuring
7. rest operator (object)
8. spread operator (object)
9. default arguments
10. arrow functions
11. iterator
12. template strings
13. classes & inheritance
*/

// array destructuring
var nos = [3, 1, 4, 2, 5];
var [x, y] = nos;

// rest operator (array)
var nos = [3, 1, 4, 2, 5];
var [x, y, ...z] = nos;

function add(...nos) {
  let result = 0;
  for (let i = 0; i < nos.length; i++) result += nos[i];
  return result;
}
add(10);
add(10, 20, 30, 40);

// spread operator (array)
var nos = [3, 1, 4, 2, 5];
var newNos = [...nos, 10, 20, 30];

function add(x, y) {
  return x + y;
}
var nos = [10, 20];
add(nos[0], nos[1]);
add(...nos);

// object destructuring
var emp = { id: 100, name: "Magesh", city: "Bangalore" };
var { id, city } = emp;

//if the variable names have to be different from the attribute names
var { id: x, city: y } = emp;

// rest operator (object)
var emp = { id: 100, name: "Magesh", city: "Bangalore" };
var { id, ...z } = emp;

// spread operator (object)
var emp = { id: 100, name: "Magesh", city: "Bangalore" };
var newEmp = { ...emp, organization: "Salesforce" };

// object construction enhancement
var id = 100,
  name = "Sridhar",
  salary = 20000;
var emp = { id, name, salary };

// default arguments
function add(x = 10, y = 20) {
  return x + y;
}

add();
add(100);
add(undefined, 200);
add(100, 200);

// arrow functions
/*
//function statement
function add(x,y){
    return x + y;
}
//function expression
var add = function(x,y){
    return x + y;
}
//arrow function
var add = (x,y) => {
    return x + y;
}
*/
var add = (x, y) => x + y;

// iterator
var nos = [3, 1, 4, 2, 5];
for (let no of nos) console.log(no);

// template strings
var x = 100,
  y = 200;
var s2 = `sum of ${x} and ${y} is ${x + y}`;

// class
class Employee {
  #id = 0; //private field
  name = "";
  city = "";

  get id() {
    console.log("[get id] triggered");
    return this.#id;
  }
  set id(val) {
    console.log("[set id] triggered");
    if (val <= 0) throw new Error("Invalid id");
    this.#id = val;
  }

  constructor(id, name, city) {
    this.#id = id;
    this.name = name;
    this.city = city;
  }

  //private method
  #format() {
    return `id = ${this.#id}, name = ${this.name}, city = ${this.city}`;
  }

  print() {
    return this.#format();
  }

  //static method
  static count() {
    return 10;
  }
}

class FulltimeEmployee extends Employee {
  benefits = "";
  constructor(id, name, city, benefits) {
    //invoking the base class constructor
    super(id, name, city);
    this.benefits = benefits;
  }

  //overriding the base class method
  print() {
    return `${super.print()}, benefits = ${this.benefits}`;
  }
}
var fte = new FulltimeEmployee(200, "Magesh", "Bangalore", "Healthcare");
fte.print();
