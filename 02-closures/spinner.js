const spinner = {
  count: 0,
  up() {
    this.count++;
    return this.count;
  },
  down() {
    this.count--;
    return this.count;
  },
};
