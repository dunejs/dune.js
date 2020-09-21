import * as fs from "fs";
import * as Path from "path";
const consola = require("consola");

import { SingleBar } from "cli-progress";

export default function (options: object | any, generatorBar: SingleBar) {
  const configPath = options.config || "./";

  const configFile = Path.join(process.cwd(), configPath, "./dune.config.js");
  const configFileDestination = Path.join(process.cwd(), ".dunejs/config.js");

  fs.copyFile(configFile, configFileDestination, (err) => {
    if (err) {
      consola.error(err);
    }
  });
  generatorBar.increment();
}
