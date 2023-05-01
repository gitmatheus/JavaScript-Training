const spinner = (() => {
  var count = 0;
  return {
    up() {
      count++;
      return count;
    },
    down() {
      count--;
      return count;
    },
  };
})();
