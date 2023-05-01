function normalize(val) {
  if (Array.isArray(val)) return add.apply(this, val);
  if (typeof val === "function") return normalize(val());
  return isNaN(val) ? 0 : parseInt(val);
}

// Uses spread notation
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
// To be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
// In an object literal, the spread syntax enumerates the properties of an object
// and adds the key-value pairs to the object being created.
function add(...args) {
  return args.reduce((result, value) => result + normalize(value), 0);
}

test("add(10,20) = 30", function () {
  var expectedValue = 30;
  var actualResult = add(10, 20);
  expect(actualResult).toBe(expectedValue);
});

test("add('10',20) = 30", function () {
  var expectedValue = 30;
  var actualResult = add("10", 20);
  expect(actualResult).toBe(expectedValue);
});

test("add('abc',20) = 20", function () {
  // NaN
  var expectedValue = 20;
  var actualResult = add("abc", 20);
  expect(actualResult).toBe(expectedValue);
});

test("add(10) = 10", function () {
  // One of the parameters is undefined
  var expectedValue = 10;
  var actualResult = add(10);
  expect(actualResult).toBe(expectedValue);
});

test("add(10,20,30,40,50) = 150", function () {
  // Several parameters
  var expectedValue = 150;
  var actualResult = add(10, 20, 30, 40, 50);
  expect(actualResult).toBe(expectedValue);
});

test("add([10,20,30,40,50]) = 150", function () {
  // Several parameters
  var expectedValue = 150;
  var actualResult = add([10, 20, 30, 40, 50]);
  expect(actualResult).toBe(expectedValue);
});

test("add([10,20],[30,40,50]) = 150", function () {
  // Arrays
  var expectedValue = 150;
  var actualResult = add([10, 20], [30, 40, 50]);
  expect(actualResult).toBe(expectedValue);
});

test("add([10,20, 'Matheus'],[30,40,50]) = 150", function () {
  // Arrays
  var expectedValue = 150;
  var actualResult = add([10, 20, "Matheus"], [30, 40, 50]);
  expect(actualResult).toBe(expectedValue);
});

test("add([10,20,30] ,['abc',50,60,70]) = 240", function () {
  // Arrays
  var expectedValue = 240;
  var actualResult = add([10, 20, 30], ["abc", 50, 60, 70]);
  expect(actualResult).toBe(expectedValue);
});

test("add(function(){ return 10; },function(){ return 20; }) //=> 30", function () {
  // Passing a function
  var expectedValue = 30;
  var actualResult = add(
    function () {
      return 10;
    },
    function () {
      return 20;
    }
  );
  expect(actualResult).toBe(expectedValue);
});

test("add(function(){ return [10,20,'abc']; },function(){ return [40,50,'60']; }) = 180", function () {
  // Passing a function
  var expectedValue = 180;
  var actualResult = add(
    function () {
      return [10, 20, "abc"];
    },
    function () {
      return [40, 50, "60"];
    }
  );
  expect(actualResult).toBe(expectedValue);
});

test("add(function(){ return [10,20,'abc']; },function(){ return [40,50,'60']; }) = 180", function () {
  // Passing a function
  var expectedValue = 180;
  var actualResult = add(
    function () {
      return [10, 20, "abc"];
    },
    function () {
      return [40, 50, "60"];
    }
  );
  expect(actualResult).toBe(expectedValue);
});

test("add([function(){ return [10,20,'abc']; },function(){ return [40,50,'60']; }]) = 180", function () {
  // Passing a function
  var expectedValue = 180;
  var actualResult = add([
    function () {
      return [10, 20, "abc"];
    },
    function () {
      return [40, 50, "60"];
    },
  ]);
  expect(actualResult).toBe(expectedValue);
});

test("add(function(){ return [function(){ return [10,20,'abc']; },function(){ return [40,50,'60']; }];}) = 180", function () {
  // Passing a function
  var expectedValue = 180;
  var actualResult = add(function () {
    return [
      function () {
        return [10, 20, "abc"];
      },
      function () {
        return [40, 50, "60"];
      },
    ];
  });
  expect(actualResult).toBe(expectedValue);
});
