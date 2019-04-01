const fs = require("fs");
const fetch = require("node-fetch");

const dataURL = "https://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json";

function makeTree(fullData) {
  const byId = {};

  fullData.forEach((r) => {
    const strId = String(r.id);
    let idData = byId[strId];

    if (idData === undefined) {
      idData = {};
    }

    let yearData = idData[r.year];
    if (yearData === undefined) {
      yearData = {};
    }

    yearData[r.make] = r.model;
    idData[r.year] = yearData;

    byId[strId]= idData;
  });
  return byId;
}

function writeJSONFile(filename, fullData) {
  const data = makeTree(fullData);
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(filename, jsonData, "utf8");
}

function main() {
  process.stdout.write(`Loading data from ${dataURL}\n`);
  const filename = "public/byid.json";
  fetch(dataURL)
      .then((res) => res.json())
      .then((json) => writeJSONFile(filename, json));
  process.stdout.write(`Data written to ${filename}\n`);
}

main();

