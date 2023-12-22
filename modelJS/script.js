import SolidBrain from "./solidBrain.js";
import DataHelper from "./dataHelper.js";
import BrainGraph from "./brainGraph.js";

let brain_opts = {
  sources: [
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
  ],
};

var sb = new SolidBrain(brain_opts);
await sb.load();
var dh = new DataHelper();
let gData = dh.brainSourcesToGData(sb.sources);

var bg = new BrainGraph(gData);
bg.display();
console.log("graph uuid & start", bg.uuid, bg.start);
