# js-training-2023

### Create a new package

Creates a package.json with default values (`-y`)

```
npm init -y
```

### Install Jest

```
npm install jest
```

### Modify files

Modify the package.json file with the following:

```
"scripts": {
    "test": "jest --watchAll"
},

```

### Run tests

```
npm test
```

---

### Function Invocation Patters

#### FUNCTIONS ARE OBJECTS

Functions can be attributes, but they are <strong>objects</strong>. For that reason, functions can have attributes too.

```
function['id'] = 100
```

Functions can also have methods!

```
fn['print'] = function() {
    console.log('Hello World');
}
```

---

### Calling functions

It doesn't matter where a function is
nor does matter who owns the function

What matters is HOW the function is invoked. And there are 6 ways to invoke a function:

1. As a method of an object
   `this` refers to the object

```
  var emp = {
    name: 'Matheus'
    whoAmI = function whoAmI() {
        console.log('I am ', this.name);
    }
  }

  // Adds the function as a property of the object;
  // In JavaScript, a function is a property
  emp.whoAmI()

  > I am Matheus
```

2. As a function

```
  var emp = {
    name: 'Matheus'
  }

  function whoAmI() {
    console.log('I am ', this.name);
  }

  // Adds the function as a property of the object;
  // In JavaScript, a function is a property
  emp['whoAmI'] = whoAmI


  var emp = {
    name: 'Matheus'
    whoAmI = REFERENCE TO THE FUNCTION whoAmI()
  }

  emp.whoAmI();
  $ I am Matheus
```

Note that this is just a reference. Almost like it appends the function to the object in its state.
For that reason, if the function whoAmI changes, it will NOT affect the result of all the other objects.
It will create a new function with the same name.

```
whoAmI();
> I am
```

That is because it refers to the Global Scope, `window.name`

```
window.name
> ''
```

POC:

```
window.name = 'JS Class'
> 'JS Class'
whoAmI();
> I am  JS Class
```

3. Using the `call` method of the function

```
var emp = {
    name : 'Magesh'
}

function greet(salutation, message){
    console.log(salutation + this.name + ', ' + message)
}

// Pass all the parameters with commas
greet.call(emp, 'Mr.', 'Have a nice day')
> Mr.Magesh, Have a nice day
```

4. Using the `apply` method of the function

```
// Pass all the parameters inside an array
greet.apply(emp, ['Mr.', 'Have a nice day'])
> Mr.Magesh, Have a nice day
```

5. As an 'Immediately Invoke Function Expression' (IIFE)

```
(function fn(){
    console.log('fn invoked')'
})()
```

```
(function add(x,y){
    return x+y;
})(100,200)

> 300
```

These functions are immediately collected by the garbage collector after used.

However, variables that are still in use, the garbage collector won't remove them.

Eg: in the code below, counter is declared, then referenced inside the method `onBtnTrackClick()`, which is referenced on the method `onDocumentLoad()`, that has a listener.
So as long as the page is loaded, the variable is kept and not removed:

```
var counter = 0;
function onBtnTrackClick() {
    var divResult = document.getElementById("divResult");
    ++counter;
    divResult.innerText = counter;
}
function onDocumentLoad() {
    var btnTrack = document.getElementById("btnTrack");
    btnTrack.addEventListener("click", onBtnTrackClick);
}

window.addEventListener("load", onDocumentLoad);

```

6. Using the 'new' keyword

---

Prevent the context from changing.

```
var emp = {
name: 'Matheus'
}

function whoAmI() {
console.log('I am ', this.name);
}

// Binds the method to the object
whoAmI = whoAmI.bind(emp)

whoAmI()
> I am Matheus

var product = {
    name : 'Product'
}

// Adds the function as a property of the object;
// In JavaScript, a function is a property
product['whoAmI'] = whoAmI

product.whoAmI()
> I am Matheus
```

---

### Higher Order Functions

- Functions can be passed as arguments
- Functions can be return as return values

### Pure Functions

- Functions without any side-effects
- The invocation of the function can be replaced with the result of the function itself, without affecting the final outcome
- Only depends on the inputs

```
function add(x, y) {
    return x + y;
    // console.log(result);
}

```

Note that this function doesn't depend on datetime, nor show things on console, and only references the inputs.
So, the output is consistent and immutable.

### Memoization

```
function memoize (fn){
    var results = {}

}
```

---

## Working with collections

### Limits for this class

DO NOT use out of the box methods for sort, filter and group.

- sort
- filter
- group

The goal is to use the requirement to learn more about how JavaScript works behind the scenes.

### Classes, Constructors, Getters, and Setters

In JS, the constructor method must be named `constructor()`
Private members have a prefix `#`

```
class ClassName {
  #id = 0
  name = '';
  city = '';

  constructor(id, name, city){
    ...
  }
}
```
