let sources = [
  {
    name: "Les lieux inspirants de l'enseignement supérieur",
    url: "./datasets/fr-esr-les-lieux-inspirants-de-l-enseignement-superieur.json",
  },
  {
    name: "Spoggy-test2 Bookmarks",
    url: "https://spoggy-test2.solidcommunity.net/public/bookmarks.ttl",
  },
  {
    name: "Un cv",
    url: "https://spoggy-test2.solidcommunity.net/public/brains/cv/",
  },
  {
    name: "Spoggy-test2 Public Folder",
    url: "https://spoggy-test2.solidcommunity.net/public/",
  },
  {
    name: "Spoggy-test2 WebId / Profile/card#me",
    url: "https://spoggy-test2.solidcommunity.net/profile/card#me",
  },
  //let source = ("./datasets/fr-esr-les-lieux-inspirants-de-l-enseignement-superieur.json");
  //let source = "https://spoggy-test2.solidcommunity.net/public/bookmarks.ttl";
  //let source = "https://spoggy-test2.solidcommunity.net/public/";
  //let source = "https://spoggy-test2.solidcommunity.net/profile/card#me";
  // permalink https://www.data.gouv.fr/fr/datasets/les-lieux-inspirants-de-lenseignement-superieur/

  // let source =
  //   "https://www.data.gouv.fr/fr/datasets/r/01ac7c17-5d11-41b5-8a51-ee82669e33c8";
];
let source = sources[0].url;
let replace = false;

let nodes = [];
let links = [];
let data_props = [];

let gData = {
  nodes: nodes,
  links: links,
};

const source_selector = document.getElementById("source-selector");
source_selector.innerHTML = "";
for (let source of sources) {
  console.log(source);
  let opt = document.createElement("option");
  opt.innerHTML = source.name;
  opt.value = source.url;
  source_selector.appendChild(opt);
}
source_selector.onchange = function (e) {
  console.log(e, e.target.value);
  source = e.target.value;
  if (replace == true) {
    nodes = [];
    links = [];
    gData = {
      nodes: nodes,
      links: links,
    };
    Graph.graphData(gData);
  }
  load_source();
};

const elem = document.getElementById("3d-graph");
let selectif = true;
let intersting_fields = ["com_nom", "dep_nom", "aca_nom", "bat_campus"];
let technique_fields = [
  "__threeObj",
  "index",
  "color",
  "x",
  "y",
  "z",
  "vx",
  "vy",
  "vz",
];

const Graph = ForceGraph3D()(elem)
  .graphData(gData)
  //.jsonUrl(json)
  .nodeAutoColorBy("type")
  //.nodeLabel((node) => `${node.user}: ${node.description}`)
  .onNodeClick((node) => {
    console.log(node);
    //currentNode = node
    const bsOffcanvas = new bootstrap.Offcanvas("#offcanvasExample");
    bsOffcanvas.show();
    populateCurrentNodeRenderer(node);
    if (node.id.startsWith("http")) {
      source = node.id;
      load_source();
    }
  });

function addNodeIfNotExist(nom, key, value) {
  let exist = nodes.find((node) => node.id === value);
  // console.log("exist", exist);

  if (!exist) {
    nodes.push({
      id: value,
      type: key,
      name: value,
    });
  }

  links.push({
    source: nom,
    target: value,
    name: key,
  });
}

function populateRetroLiens(selectedNode) {
  let retroDiv = document.getElementById("retroLiens");
  retroDiv.innerHTML = "";
  let retroTitle = document.createElement("h2");
  retroTitle.textContent = "Retro";
  retroDiv.appendChild(retroTitle);
  let liste = document.createElement("ul");
  retroDiv.appendChild(liste);

  let retro = links.filter((l) => l.target.id === selectedNode.id);
  console.log("retro", retro);

  retro.forEach((l) => {
    let li = document.createElement("li");

    li.appendChild(document.createTextNode(l.name + " : "));
    let btn = document.createElement("button");
    btn.textContent = JSON.stringify(l.source.id);
    btn.id = JSON.stringify(l.source.id);
    btn.type = "button";
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    // btn.class="btn btn-primary"

    btn.addEventListener("click", (e) => {
      console.log(e.target.id);
      // console.log(btn.getAttributes("id"))
    });
    li.appendChild(btn);
    //li.textContent = l.name + " : " + JSON.stringify(l.source.id)
    liste.appendChild(li);
  });

  // let links = [];
  // for (const [key, value] of Object.entries(selectedNode)) {
  //   if (key == "fields") {
  //     for (const [subKey, subValue] of Object.entries(value)) {
  //       if (typeof subValue == "string" && subValue.startsWith("http")) {
  //         links.push({
  //           source: selectedNode.id,
  //           target: subValue,
  //           name: subKey,
  //         });
  //       }
  //     }
  //   }
  // }
  // return links;
}

function populateCurrentNodeRenderer(selectedNode) {
  populateRetroLiens(selectedNode);
  // Get the information of the selected node
  // const nodeInfo = getNodeInfo(selectedNode);

  // // Create a renderer element to display the node information
  // const renderer = document.createElement('div');

  // // Display the node information
  // const nodeTitle = document.createElement('h2');
  // nodeTitle.textContent = nodeInfo.title;
  // renderer.appendChild(nodeTitle);

  // const nodeDescription = document.createElement('p');
  // nodeDescription.textContent = nodeInfo.description;
  // renderer.appendChild(nodeDescription);

  // // Create clickable properties for navigation
  // for (const property of nodeInfo.properties) {
  //   const propertyLink = document.createElement('a');
  //   propertyLink.href = property.url;
  //   propertyLink.textContent = property.name;
  //   renderer.appendChild(propertyLink);
  //   renderer.appendChild(document.createElement('br'));
  // }

  // // Append the renderer element to the DOM
  // const currentNodeRenderer = document.getElementById('currentNodeRenderer');
  // currentNodeRenderer.innerHTML = '';
  // currentNodeRenderer.appendChild(renderer);

  let container = document.getElementById("currentNodeRenderer");
  container.innerHTML = "";

  let ul = document.createElement("ul");

  for (const [key, value] of Object.entries(selectedNode)) {
    if (!technique_fields.includes(key)) {
      let li = document.createElement("li");
      li.textContent = `${key}: ${value}`;
      ul.appendChild(li);
      // div.innerHTML += `${key}: ${value}<br>`;
    }
    if (key == "fields") {
      let subUl = document.createElement("ul");
      for (const [subKey, subValue] of Object.entries(value)) {
        let subLi = document.createElement("li");
        if (typeof subValue == "string" && subValue.startsWith("http")) {
          subLi.innerHTML = `<a href="${subValue}" target="_blank">${subValue}</a>`;
        } else {
          subLi.textContent = `${subKey}: ${subValue}`;
        }
        //subLi.textContent = typeof subValue=="string" &&  subValue.startsWith('http') ? `<a href="${subValue}" target="_blank">${subValue}</a>` : `${subKey}: ${subValue}`;
        subUl.appendChild(subLi);
      }
      ul.appendChild(subUl);
    }
  }

  // div.innerHTML = JSON.stringify(selectedNode);
  container.appendChild(ul);
}

// // Example usage:
// const selectedNode = 'someNode';
// populateCurrentNodeRenderer(selectedNode);

function addDataProps(prop) {
  data_props[prop] == undefined ? (data_props[prop] = 0) : data_props[prop]++;
  //console.log(data_props);
}

async function updateSolidGraph(solidDataset) {
  //console.log("updateSolidGraph", solidDataset);
  for await (const resource of solidDataset) {
    console.log("resource", resource);
    let id = resource["@id"];
    let node = {
      id: id,
      name: id,
    };

    let exist = nodes.find((n) => n.id === id);
    if (!exist) {
      //console.log("push", node);
      nodes.push(node);
    } else {
      console.log("possible update to ", id);
    }

    for (const [key, value] of Object.entries(resource)) {
      let arrayValues = Array.isArray(value) ? value : [value];

      for (const v of arrayValues) {
        console.log(key, v);
        if (key != "@id") {
          if (typeof v == "string") {
            addNodeIfNotExist(id, key, v);
          } else if (typeof v == "object") {
            addNodeIfNotExist(id, key, v["@id"]);
          }
        }
      }
      //console.log(`${key}: ${value} ${Array.isArray(value)}`);
    }
  }
  console.log("nodes", nodes);
  gData = {
    nodes: nodes,
    links: links,
  };
  Graph.graphData(gData);
}

function updateGraph(json) {
  for (let i = 0; i < json.length; i++) {
    let nom = json[i].fields.espace_nom;
    nodes.push({
      id: nom,
      title: nom,
      name: json[i].fields.espace_nom,
      description: json[i].fields.espace_description,
      fields: json[i].fields,
      type: "lieu",
    });

    for (let [key, value] of Object.entries(json[i].fields)) {
      // console.log(key, value);
      addDataProps(key);

      if (typeof value === "string") {
        let multi = value.split(";");
        //console.log(multi);

        for (let i = 0; i < multi.length; i++) {
          if (selectif) {
            if (intersting_fields.includes(key)) {
              //console.log(nom, key, value);
              addNodeIfNotExist(nom, key, multi[i]);
            }
          } else if (
            value != "Oui" &&
            value != "Non" &&
            typeof value === "string"
          ) {
            addNodeIfNotExist(nom, key, multi[i]);
          }
        }
      }
    }
  }

  console.log("nodes", nodes);
  gData = {
    nodes: nodes,
    links: links,
  };
  Graph.graphData(gData);

  // for (let i = 0; i < json.length; i++) {
  //     nodes.push({id: json[i].fields.lieu_nom})
  //   links.push({
  //     source: json[i].fields.espace_nom,
  //     target: json[i].fields.lieu_nom,
  //   });
  // }

  // .onNodeClick(node => window.open(`https://bl.ocks.org/${node.user}/${node.id}`, '_blank'));

  //   const Graph = ForceGraph3D()(elem)
  //     .jsonUrl(json)
  //     .nodeAutoColorBy('user')
  //     .nodeLabel(node => `${node.fileds.espace_nom}: ${node.description}`)
  //     .onNodeClick(node => window.open(`https://bl.ocks.org/${node.user}/${node.id}`, '_blank'));
}

let fetch_options = {};
let headers = { Accept: "application/ld+json" };
fetch_options.headers = headers;

const context = {
  name: "http://schema.org/name",
  homepage: { "@id": "http://schema.org/url", "@type": "@id" },
  image: { "@id": "http://schema.org/image", "@type": "@id" },
};

function load_source() {
  fetch(source, fetch_options)
    .then((response) => response.json())
    .then(async (json) => {
      console.log(json);
      if (json["@context"] != undefined) {
        console.log("On a du jsonld", json);
        let compacted = await jsonld.compact(json, context);
        let expanded = await jsonld.expand(json);
        const flattened = await jsonld.flatten(json);
        //const framed = await jsonld.frame(doc, frame);
        console.log("compacted", compacted);
        console.log("expanded", expanded);
        console.log("flattened", flattened);
        updateSolidGraph(expanded);
      } else {
        updateGraph(json);
      }
    });
}

load_source();

//   const Graph = ForceGraph3D()(elem)
//     .jsonUrl(
//     .nodeAutoColorBy('user')
//     .nodeLabel(node => `${node.fileds.espace_nom}: ${node.description}`)
//     .onNodeClick(node => window.open(`https://bl.ocks.org/${node.user}/${node.id}`, '_blank'));

const doc = {
  "http://schema.org/name": "Manu Sporny",
  "http://schema.org/url": { "@id": "http://manu.sporny.org/" },
  "http://schema.org/image": {
    "@id": "http://manu.sporny.org/images/manu.png",
  },
};

async function test_jsonld() {
  console.log("jsonld", jsonld);

  // compact a document according to a particular context
  const compacted = await jsonld.compact(doc, context);
  console.log(JSON.stringify(compacted, null, 2));
  /* Output:
{
  "@context": {...},
  "name": "Manu Sporny",
  "homepage": "http://manu.sporny.org/",
  "image": "http://manu.sporny.org/images/manu.png"
}
*/

  // compact using URLs
  //const compacted = await jsonld.compact('http://example.org/doc', 'http://example.org/context', ...);
}

test_jsonld();
