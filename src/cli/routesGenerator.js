const fs = require("fs");
const Path = require("path");
const consola = require("consola");

const { generateRoutes } = require("vue-route-generator");

module.exports = function routesGenerator(appFolder) {
  const pagesFolder = Path.join(process.cwd(), appFolder, "/pages/");
  const pagesFolderPrefix = Path.join("../", appFolder, "/pages/");
  const routesFile = Path.join(process.cwd(), ".generated/routes.js");

  // Generate routes
  const routes = generateRoutes({
    pages: pagesFolder,
    importPrefix: pagesFolderPrefix,
  });
  fs.writeFileSync(routesFile, routes);

  consola.info("Routes generated !");
};
