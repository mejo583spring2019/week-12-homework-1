const fs = require("fs");
const fetch = require("node-fetch");

const dataURL =
  "https://gist.githhttps://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.jsonubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json";

function makeTree(fullData) {
  const byMake = {};

  fullData.forEach((r) => {
    const strYear = String(r.year);

    let makeData = byMake[r.make];
    if (makeData === undefined) {
      makeData = {};
    }

    let modelData = makeData[r.model];
    if (modelData === undefined) {
      modelData = {};
    }

    modelData[strYear] = r.id;
    makeData[r.model] = modelData;

    byMake[r.make] = makeData;
  });
  return byMake;
}

function writeJSONFile(filename, fullData) {
  const data = makeTree(fullData);
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(filename, jsonData, "utf8");
}

function main() {
  const filename = "public/bymake.json";
  fetch(dataURL)
      .then((res) => res.json())
      .then((json) => writeJSONFile(filename, json));
}

main();
