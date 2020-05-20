const chokidar = require("chokidar");
const Path = require("path");
const generate = require("./generator/index");
const consola = require("consola");

module.exports = function filesWatcher(options) {
  const config = require(Path.join(process.cwd(), ".dunejs/config"));
  const srcDir = config.srcDir || options.config || "./";

  const appFolder = Path.join(process.cwd(), srcDir);
  consola.info("Files watcher started !");

  chokidar
    .watch(appFolder, {
      ignoreInitial: true
    })
    .on("all", (event, path) => {
      consola.info("File changes detected, rebuild started !");
      generate(folder);
    });
};
