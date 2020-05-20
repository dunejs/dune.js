const chokidar = require("chokidar");
const Path = require("path");
const generateStores = require("../generator/stores");
const consola = require("consola");

module.exports = function routesWatcher(options, watcherBar) {
    const config = require(Path.join(process.cwd(), ".dunejs/config"));
    const srcDir = config.srcDir || options.config || "./";

    const appFolder = Path.join(process.cwd(), srcDir, "./store/");

    watcherBar.increment();

    chokidar
        .watch(appFolder, {
            ignoreInitial: true
        })
        .on("add", (event, path) => {
            onChange(options);
        }).on("unlink", (event, path) => {
            onChange(options);
        }).on("unlinkDir", (event, path) => {
            onChange(options);
        }).on("addDir", (event, path) => {
            onChange(options);
        });

    function onChange(options) {
        consola.info("Store changed, rebuild started !");
        generateStores(options, null);
    }
};
