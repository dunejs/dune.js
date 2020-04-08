const fs = require("fs");
const Path = require("path");
const consola = require("consola");

module.exports = function generateFolder() {
  const generatedFolder = Path.join(process.cwd(), ".generated/");

  if (!fs.existsSync(generatedFolder)) {
    fs.mkdirSync(generatedFolder);
    consola.info("Generated folder created !");
  }
};
