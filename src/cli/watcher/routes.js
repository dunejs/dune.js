const chokidar = require("chokidar");
const Path = require("path");
const generateRoutes = require("../generator/routes");
const consola = require("consola");

module.exports = function routesWatcher(options, watcherBar) {
  const config = require(Path.join(process.cwd(), ".dunejs/config"));
  const srcDir = config.srcDir || options.config || "./";

  const appFolder = Path.join(process.cwd(), srcDir, "./pages/");

  watcherBar.increment();
  function onChange(options) {
    consola.info("Pages changed, rebuild started !");
    generateRoutes(options, null);
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
