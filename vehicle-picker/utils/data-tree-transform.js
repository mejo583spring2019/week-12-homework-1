
const fetch = require("node-fetch");

const dataURL = "https://gist.githubusercontent.com/leetrout/06691832f46d91ea0d533b5280467491/raw/cca39786bcddd93a4aebe88ade03b5c9f33b1fb0/vehicle_flat.json"
    ;
function main() {
  console.log(dataURL);

  fetch(dataURL)
      .then((res) => res.json())
      .then((json) => console.log(json.length));
}

main();
