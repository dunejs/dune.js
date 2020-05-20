const fs = require("fs");
const Path = require("path");
const consola = require("consola");

module.exports = function generateFolder(generatorBar) {
  const generatedFolder = Path.join(process.cwd(), ".dunejs/");

  if (!fs.existsSync(generatedFolder)) {
    fs.mkdirSync(generatedFolder, { recursive: true })
  }

  generatorBar.increment();
};
