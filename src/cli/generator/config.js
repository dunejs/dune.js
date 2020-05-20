const fs = require("fs");
const Path = require("path");
const consola = require("consola");

module.exports = function generateConfig(options, generatorBar) {
  const configPath = options.config || "./";

  const configFile = Path.join(process.cwd(), configPath, "./dune.config.js");
  const configFileDestination = Path.join(process.cwd(), ".dunejs/config.js");

  fs.copyFile(configFile, configFileDestination, (err) => {
    if (err) {
      consola.error(err);
    }
  });
  generatorBar.increment();
};
