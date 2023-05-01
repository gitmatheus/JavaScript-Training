function normalize(val) {
  var result = 0;
  if (Array.isArray(val)) {
    for (var idx = 0; idx < val.length; idx++) {
      result += normalize(val[idx]);
    }
  } else {
    result = isNaN(val) ? 0 : parseInt(val);
  }
  return result;
}

function add(x, y) {
  var result = 0;
  for (var idx = 0; idx < arguments.length; idx++) {
    result += normalize(arguments[idx]);
  }
  return result;
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
  // Several parameters
  var expectedValue = 150;
  var actualResult = add([10, 20], [30, 40, 50]);
  expect(actualResult).toBe(expectedValue);
});

test("add([10,20, 'Matheus'],[30,40,50]) = 150", function () {
  // Several parameters
  var expectedValue = 150;
  var actualResult = add([10, 20, "Matheus"], [30, 40, 50]);
  expect(actualResult).toBe(expectedValue);
});

test("add([10,20,30] ,['abc',50,60,70]) = 240", function () {
  // Several parameters
  var expectedValue = 240;
  var actualResult = add([10, 20, 30], ["abc", 50, 60, 70]);
  expect(actualResult).toBe(expectedValue);
});
