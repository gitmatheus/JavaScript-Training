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

  //async
  function addAsync(x, y) {
    console.log(`   [@service] processing ${x} and ${y}`);
    setTimeout(() => {
      const result = x + y;
      console.log(`   [@service] returning result`);
      return result;
    }, 5000);
  }

  function addAsyncClient() {
    console.log(`[@client] invoking the service`);
    const result = addAsync(100, 200);
    console.log(`[@client] result = ${result}`);
  }

  window["addAsyncClient"] = addAsyncClient;
})();
