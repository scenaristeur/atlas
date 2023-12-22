import Base from "./base.js";

export default class DataHelper extends Base {
  constructor(opts) {
    super(opts);
  }
  brainSourcesToGData(sources) {
    for (const source of sources) {
      console.log("source", source, source.resources);
      for (const resource of source.resources) {
        console.log(resource);
      }
    }
  }
}
