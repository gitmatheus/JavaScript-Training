// Modify the memoize function in such a a way that it can memoize the result of
// any function with any number of arguments
function memoize(fn) {
  var results = {};
  return function (...args) {
    if (results.hasOwnProperty(args)) return results[args];
    console.log("processing :", args);
    var result = fn(args);
    results[args] = result;
    return result;
  };
}

var isEven = memoize(function (no) {
  return no % 2 === 0;
});

var isPrime = memoize(function isPrime(no) {
  for (var i = 2; i <= no / 2; i++) {
    if (no % i === 0) {
      return false;
    }
  }
  return true;
});

var add = memoize(function add(args) {
  function parseArg(n) {
    if (typeof n === "function") return parseArg(n());
    if (Array.isArray(n)) return add.apply(this, n);
    return isNaN(n) ? 0 : parseInt(n);
  }
  return arguments.length <= 1
    ? parseArg(arguments[0])
    : parseArg(arguments[0]) + add.apply(this, [].slice.call(arguments, 1));
});

// https://github.com/tkmagesh/Salesforce-AdvJs-May-2023/blob/main/02-closures/memoization.js

// var isPrime = (function(){
//     var results = {}
//     function isPrime(no) {
//         for (var i = 2; i <= (no / 2); i++) {
//             if (no % i === 0) {
//                 return false
//             }
//         }
//         return true
//     }
//     return function(no){
//         if (results.hasOwnProperty(no)) return results[no]
//         console.log('processing :', no)
//         results[no] = isPrime(no)
//         return results[no]
//     }
// })()

// var isEven = (function () {
//     var results = {}
//     function isEven(no) {
//         return no % 2 === 0;
//     }
//     return function (no) {
//         if (results.hasOwnProperty(no)) return results[no]
//         console.log('processing :', no)
//         results[no] = isEven(no)
//         return results[no]
//     }
// })()
