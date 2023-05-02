function group(title, fn) {
  console.group(title);
  fn();
  console.groupEnd();
}

group("Initial Group", function () {});
