import * as fs from "fs";
import * as Path from "path";

import { generateRoutes } from "vue-route-generator";
import { SingleBar } from "cli-progress";

export default function (
  options: object | any,
  generatorBar: SingleBar | null
) {
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
}
