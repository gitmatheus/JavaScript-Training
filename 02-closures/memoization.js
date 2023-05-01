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

// Modify the memoize function in such a a way that it can memoize the result of
// any function with any number of arguments
function memoize(fn) {
  var results = {};
  return function (val) {
    if (results.hasOwnProperty(val)) return results[val];
    console.log("processing :", val);
    results[val] = fn(val);
    return results[val];
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

var add = memoize(function (x, y) {
  return x + y;
});
