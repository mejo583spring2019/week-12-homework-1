const fetch = require("node-fetch");
const fs = require("fs");

const dataUrl = "https://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json";

let fullFinalData;

function makeTree(fullData) {
  let makeData;
  let modelData;
  let yearData;
  const finalData = {};
  fullData.forEach((record) => {
    makeData = record.make;

    if (makeData === undefined) {
      makeData = {};
    }

    modelData = record.model;

    if (modelData === undefined) {
      modelData = {};
    }

    yearData = record.year;

    if (yearData === undefined) {
      yearData = {};
    }

    modelData[record.make] = record.year;

    finalData[record.model] = modelData;


    console.log(finalData.Venza);
  });
  fullFinalData = finalData;
}

function writeJSONfile(fileName, fullData) {
  const data = makeTree(fullData);
  const JSONdata = JSON.stringify(data);
  fs.writeFileSync(fileName, JSONdata, "utf8");
}

function main() {
  process.stdout.write(`Loading Data from ${dataUrl}/n`);
  const fileName = "public/byModel.json";
  fetch(dataUrl)
      .then((res) => res.json())
      .then((json) => writeJSONfile(fileName, json));
  process.stdout.write(`Data written to ${fileName}`);
}

main();
