import * as chokidar from "chokidar";
import * as Path from "path";
const consola = require("consola");

import generateLayouts from "../generators/layouts";

import { SingleBar } from "cli-progress";

export default (options: object | any, watcherBar: SingleBar) => {
  const config = require(Path.join(process.cwd(), ".dunejs/config"));
  const srcDir = config.srcDir || options.config || "./";

  const appFolder = Path.join(process.cwd(), srcDir, "./layouts/");

  watcherBar.increment();
  function onChange(options: object) {
    consola.info("Layouts changed, rebuild started !");
    generateLayouts(options, null);
  }

  chokidar
    .watch(appFolder, {
      ignoreInitial: true,
    })
    .on("add", () => {
      onChange(options);
    })
    .on("unlink", () => {
      onChange(options);
    })
    .on("unlinkDir", () => {
      onChange(options);
    })
    .on("addDir", () => {
      onChange(options);
    });
};
