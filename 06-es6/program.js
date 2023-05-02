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
