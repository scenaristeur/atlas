import Base from "./base.js";

export default class BrainGraph extends Base {
  constructor(opts) {
    super(opts);
    this.foo =
      "!!!!!!\n HEy Hey ############################### \n bar est une fonction de BrainGraph dans un module";
  }
  display() {
    console.log("display", this.opts);
  }
}
