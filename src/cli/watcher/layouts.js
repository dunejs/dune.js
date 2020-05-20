const chokidar = require("chokidar");
const Path = require("path");
const generateLayouts = require("../generator/layouts");
const consola = require("consola");

module.exports = function routesWatcher(options, watcherBar) {
  const config = require(Path.join(process.cwd(), ".dunejs/config"));
  const srcDir = config.srcDir || options.config || "./";

  const appFolder = Path.join(process.cwd(), srcDir, "./layouts/");

  watcherBar.increment();
  function onChange(options) {
    consola.info("Layouts changed, rebuild started !");
    generateLayouts(options, null);
  }

  chokidar
    .watch(appFolder, {
      ignoreInitial: true,
    })
    .on("add", (event, path) => {
      onChange(options);
    })
    .on("unlink", (event, path) => {
      onChange(options);
    })
    .on("unlinkDir", (event, path) => {
      onChange(options);
    })
    .on("addDir", (event, path) => {
      onChange(options);
    });
};
