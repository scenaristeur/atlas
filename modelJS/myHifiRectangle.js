import Rectangle from "./rectangle.js";

export default class MyHiFiRectangle extends Rectangle {
  constructor(height, width) {
    super(height, width);
    this.foo =
      "!!!!!!\n HEy Hey ############################### \n bar est une fonction de Rectangle dans un module";
  }
}
