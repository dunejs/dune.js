const chokidar = require("chokidar");
const Path = require("path");
const generate = require("./generate");
const consola = require("consola");

module.exports = function filesWatcher(folder) {
  const appFolder = Path.join(process.cwd(), folder.src);
  consola.info("Files watcher started !");

  chokidar
    .watch(appFolder, {
      ignoreInitial: true,
    })
    .on("all", (event, path) => {
      consola.info("File changes detected, rebuild started !");
      generate(folder);
    });
};
