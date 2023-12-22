import Base from "./base.js";

export default class SolidBrain extends Base {
  constructor(opts) {
    super(opts);
    this.foo =
      "!!!!!!\n HEy Hey ############################### \n bar est une fonction de SolidBrain dans un module";
  }

  fetchPromise(source) {
    let fetch_options = {};
    let headers = { Accept: "application/ld+json" };
    fetch_options.headers = headers;
    return fetch(source.url, fetch_options)
      .then((response) => response.json())
      .then(async (json) => {
        console.log(source.name, json);
        source.loaded = "ok";
        source.resources = await jsonld.expand(json);
        return source;
      });
  }

  async load() {
    //console.log("load", this.opts);
    const promises = this.opts.sources.map((source) =>
      this.fetchPromise(source)
    );
    this.sources = await Promise.all(promises);
    console.log(this.sources);
  }

  gData() {
    let nodes = [
      { id: 1, name: "One" },
      { id: 2, name: "Two" },
    ];
    let links = [
      { source: 1, target: 2, name: "from one" },
      { source: 2, target: 1, name: "from two" },
    ];

    return { nodes, links };
  }
}
