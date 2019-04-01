// for my own data tree, sorted first by make, then year, then model
const fs = require("fs");
const fetch = require("node-fetch");
const dataURL = "https://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json";

function makeTree(fullData) {
  const byMake = {};
  fullData.forEach((r) => {
    let makeData = byMake[r.make];
    if (makeData === undefined) {
      makeData = {};
    }
    const strYear = String(r.year);
    let yearData = strYear.makeData[r.year];
    if (yearData === undefined) {
      yearData = {};
    }
    yearData[r.model] = r.id;
    makeData[r.year] = yearData;
    byMake[r.make] = makeData;
  });
  return byMake;
}

function writeJSONFile(fullData) {
  const data = makeTree(fullData);
  const jsonData = JSON.stringify(data);
  // fs.writeFileSync(file, data[, options])
  fs.writeFileSync("public/bymake.json", jsonData, "utf8");
}


function main() {
  // process.stdout.write(`Loading data from ${dataURL}\n`);
  // const filename = "public/bymake.json";
  fetch(dataURL)
      .then((res) => res.json())
      .then((json) => writeJSONFile(json));
  // console.log("finished");
  // process.stdout.write(`Data written to ${"public/bymake.json"}\n`);
}
main();

