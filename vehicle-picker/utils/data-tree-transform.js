const fetch = require("node-fetch");
const fs = require("fs");

const dataUrl = "https://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json";


function makeTree(fullData) {
  const byYear = {};
  fullData.forEach((record) => {
    const strYear = String(record.year);
    let yearData = byYear[strYear];

    if (yearData === undefined) {
      yearData = {};
    }

    let makeData = yearData[record.make];

    if (makeData === undefined) {
      makeData = {};
    }

    makeData[record.model] = record.id;
    yearData[record.make] = makeData;


    byYear[strYear] = yearData;
  });

  return byYear;
}

function writeJSONfile(fileName, fullData) {
  const data = makeTree(fullData);
  const JSONdata = JSON.stringify(data);
  fs.writeFileSync(fileName, JSONdata, "utf8");
}

function main() {
  process.stdout.write(`Loading Data from ${dataUrl}/n`);
  const fileName = "public/byYear.json";
  fetch(dataUrl)
      .then((res) => res.json())
      .then((json) => writeJSONfile(fileName, json));
  process.stdout.write(`Data written to ${fileName}`);
}

main();
