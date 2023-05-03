// RUN THE FOLLOWING COMMAND npx http-server -c -1

console.log("worker-job loaded");

function doWork() {
  for (let i = 1; i <= 10000; i++) {
    for (let j = 0; j < 1000; j++) for (let k = 0; k < 2000; k++) {}
    if (i % 100 === 0) {
      const percentCompleted = (i / 10000) * 100;
      console.log(percentCompleted);
      self.postMessage({
        type: "progress",
        percentCompleted,
      });
    }
  }
}

self.addEventListener("message", (evtArg) => {
  if (evtArg.data.type === "start") {
    console.log("starting doWork");
    doWork();
    self.postMessage({ type: "completed" });
  }
});
