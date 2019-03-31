const fetch = require("node-fetch");
const fs = require("fs");

const dataURL = "https://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json";

function makeMakeYearModelTree(fullData) {
  const byMake = {};

  return byMake;
}

function writeJSONFile(filename, fullData) {
  const data = makeMakeYearModelTree(fullData);
  const jsonData = JSON.stringify(data);
  fs.writeFileSync(filename, jsonData, "utf8");
}

function main() {
  process.stdout.write(`Data written to ${dataURL}\n`);
  const filename = "public/byMake.json";
  fetch(dataURL)
      .then((res) => res.json())
      .then((json) => writeJSONFile(filename, json));
  process.stdout.write(`Data written to ${filename}\n`);
}

main();
