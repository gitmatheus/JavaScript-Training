(function () {
  //sync
  function addSync(x, y) {
    console.log(`   [@service] processing ${x} and ${y}`);
    const result = x + y;
    console.log(`   [@service] returning result`);
    return result;
  }

  function addSyncClient() {
    console.log(`[@client] invoking the service`);
    const result = addSync(100, 200);
    console.log(`[@client] result = ${result}`);
  }

  window["addSyncClient"] = addSyncClient;

  //handling errors
  function divideSync(x, y) {
    console.log(`   [@service] processing ${x} and ${y}`);
    if (y === 0) {
      throw new Error("invalid arguments. divisor cannot be 0");
    }
    const result = x / y;
    console.log(`   [@service] returning result`);
    return result;
  }

  function divideSyncClient() {
    try {
      console.log(`[@client] invoking the service`);
      const result = divideSync(100, 0);
      console.log(`[@client] result = ${result}`);
    } catch (e) {
      console.log(`[@client] error occurred : ${e}`);
    }
  }

  window["divideSyncClient"] = divideSyncClient;

  //async (using callback)
  function addAsync(x, y, callback) {
    console.log(`   [@service] processing ${x} and ${y}`);
    setTimeout(() => {
      const result = x + y;
      console.log(`   [@service] returning result`);
      // return result
      callback(result);
    });
  }

  function addAsyncClient() {
    console.log(`[@client] invoking the service`);
    addAsync(100, 200, function (result) {
      console.log(`[@client] result = ${result}`);
    });
  }

  window["addAsyncClient"] = addAsyncClient;

  //==================================================
  // handling errors
  // This method will use divideAsyncPromise
  // It will also catch if the result was rejected
  // And display the error message that was returned by the promise
  function divideAsync(x, y) {
    console.log(`   [@service] processing ${x} divided by ${y}`);
    return divideAsyncPromise(x, y)
      .then((result) => {
        console.log(`[@client] result = ${result}`);
      })
      .catch((err) => {
        // callback invoked when the promise is "rejected"
        console.log(`[@client] rejected : ${err}`);
      });
  }

  function divideAsyncPromise(x, y) {
    const p = new Promise(function (resolveFn, rejectFn) {
      setTimeout(() => {
        if (y === 0) {
          const err = new Error("invalid arguments. divisor cannot be 0");
          rejectFn(err);
        } else {
          const result = x / y;
          resolveFn(result);
        }
      }, 2000);
    });
    return p;
  }

  window["divideAsync"] = divideAsync;
  //==================================================

  function divideAsyncClient() {
    console.log(`[@client] invoking the service`);

    // call divideAsync with err and result (callback), and process the response
    divideAsync(100, 0, function (err, result) {
      if (err) {
        console.log(`[@client] error occurred : ${err}`);
        return;
      }
      console.log(`[@client] result = ${result}`);
    });
  }
  window["divideAsyncClient"] = divideAsyncClient;

  function addAsyncPromise(x, y) {
    console.log(`   [@service] processing ${x} + ${y}`);

    const p = new Promise(function (resolveFn, rejectFn) {
      setTimeout(() => {
        const result = x + y;
        console.log(`   [@service] returning result`);
        resolveFn(result);
      }, 2000);
    });
    return p;
  }
  window["addAsyncPromise"] = addAsyncPromise;
})();

//client
/* 
console.log(`[@client] invoking the service`)
const p = divideAsyncPromise(100,200)
.then(function(result) { // callback invoked when the promise is "resolved"
    console.log(`[@client] result = ${result}`)
}).catch(function(result) { // callback invoked when the promise is "rejected"
    console.log(`[@client] rejected`)
})


//

// follow up operation (async)
/* 
console.log(`[@client] invoking the service`)
const p = addAsyncPromise(100, 200)
var p2 = p.then(function (result) { // callback invoked when the promise is "resolved"
    console.log(`[@client] result = ${result}`)

    //follow up (async)
    const p2 = new Promise((resolveFn, rejectFn) => {
        setTimeout(() => {
            const doubleResult = result * 2
            resolveFn(doubleResult)
        }, 4000);
    });
    return p2
})
p2.then(doubleResult => console.log(`doubleResult : ${doubleResult}`)) 
*/

// follow up operation (sync) - 1
/* 
console.log(`[@client] invoking the service`)
const p = addAsyncPromise(100, 200)
var p2 = p.then(function (result) { // callback invoked when the promise is "resolved"
    console.log(`[@client] result = ${result}`)

    //follow up (sync)
    const p2 = new Promise((resolveFn, rejectFn) => {
        const doubleResult = result * 2
        resolveFn(doubleResult);
    });
    return p2
})
p2.then(doubleResult => console.log(`doubleResult : ${doubleResult}`)) 
*/

// follow up operation (sync) - 2
/* 
console.log(`[@client] invoking the service`)
const p = addAsyncPromise(100, 200)
var p2 = p.then(function (result) { // callback invoked when the promise is "resolved"
    console.log(`[@client] result = ${result}`)

    //follow up operation (sync)
    const doubleResult = result * 2
    const p2 = Promise.resolve(doubleResult)
    return p2
})
p2.then(doubleResult => console.log(`doubleResult : ${doubleResult}`)) 
*/

// promise chaining - 1
/* 
console.log(`[@client] invoking the service`)
const p = addAsyncPromise(100, 200)
//p.then() by default returns a promise
var p2 = p.then(function (result) { // callback invoked when the promise is "resolved"
    console.log(`[@client] result = ${result}`)

    //follow up operation (sync)
    const doubleResult = result * 2
    return doubleResult;
})
var p3 = p2.then(doubleResult => {
    console.log(`doubleResult : ${doubleResult}`);
    return 'dummy result'
}) 
*/

// promise chaining - 1
// THE WAY TO GO
/* 
console.log(`[@client] invoking the service`)
var quadrupResult = addAsyncPromise(100, 200)
    .then(function (result) { // callback invoked when the promise is "resolved"
        console.log(`[@client] result = ${result}`)
        //follow up operation (sync)
        const doubleResult = result * 2
        return doubleResult;
    })
    .then(doubleResult => {
        console.log(`doubleResult : ${doubleResult}`);
        const quadResult = doubleResult * 2;
        return quadResult;
    }) 

console.log(`[@client] invoking the service`)
var divideResult = addAsyncPromise(100, 200)
    .then(function (result) { // callback invoked when the promise is "resolved"
        console.log(`[@client] result = ${result}`)
        //follow up operation (sync)
        const doubleResult = result * 2
        return doubleResult;
    })
    .then(doubleResult => {
        console.log(`doubleResult : ${doubleResult}`);
        const quadResult = doubleResult * 2;
        return quadResult;
    }) 

console.log(`[@client] invoking the service`)
var divideResult = divideAsync(100, 200)
*/
