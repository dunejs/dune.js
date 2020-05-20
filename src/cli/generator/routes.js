const fs = require("fs");
const Path = require("path");

const { generateRoutes } = require("vue-route-generator");

module.exports = function generateRouter(options, generatorBar) {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const srcDir = config.srcDir || options.config || "./";

  const pagesFolder = Path.join(process.cwd(), srcDir, "/pages/");
  const pagesFolderPrefix = Path.join("../", srcDir, "/pages/");
  const routesFile = Path.join(process.cwd(), ".dunejs/routes.js");

  // Generate routes
  const routes = generateRoutes({
    pages: pagesFolder,
    importPrefix: pagesFolderPrefix,
  });
  fs.writeFileSync(routesFile, routes);

  if (generatorBar !== null) {
    generatorBar.increment();
  }
};
