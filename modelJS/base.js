export default class Base {
  constructor(opts = {}) {
    this.opts = opts;
    this.start = Date.now();
    this.uuid = crypto.randomUUID();
  }
}
