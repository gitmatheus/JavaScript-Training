const spinner = (() => {
  let count = 0;
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
