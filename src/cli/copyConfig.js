const fs = require("fs");
const Path = require("path");
const consola = require("consola");

module.exports = function copyConfig(appFolder) {
  const configFile = Path.join(process.cwd(), appFolder, "/dune.config.js");
  const configFileDestination = Path.join(
    process.cwd(),
    ".generated/config.js"
  );

  fs.copyFile(configFile, configFileDestination, (err) => {
    if (err) {
      consola.error(err);
    }
  });

  consola.info("Config file copied !");
};
