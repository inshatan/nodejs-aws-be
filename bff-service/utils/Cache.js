const symbolData = Symbol('Cache data');
const symbolDatetime = Symbol('Cache datetime');

module.exports = class Cache {
  constructor(ttl = 120) {
    this.ttl = ttl;
    this[symbolDatetime] = null;
    this[symbolData] = null;
  }

  get expired() {
    return !this[symbolDatetime] || (this[symbolDatetime] + this.ttl * 1e3 < Date.now());
  }

  set data(data) {
    this[symbolData] = data;
    this[symbolDatetime] = Date.now();
  }

  get data() {
    return this.expired ? undefined : this[symbolData];
  }
};
