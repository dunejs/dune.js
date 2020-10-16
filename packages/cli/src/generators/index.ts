import * as cliProgress from "cli-progress";
import * as chalk from "chalk";
const consola = require("consola");

import generateFolder from "./folder";
import generateConfig from "./config";
import generatePlugins from "./plugins";
import generateRoutes from "./routes";
import generateLayouts from "./layouts";
import generateCss from "./css";
import generateStores from "./stores";
import generateApp from "./app";

export default (options: object) => {
  const generatorBar = new cliProgress.SingleBar({
    format: `Generation in progress... | ${chalk.red(
      "{bar}"
    )} | {percentage}% | {value}/{total}`,
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  generatorBar.start(8, 0);

  generateFolder(generatorBar);
  generateApp(generatorBar);
  generateConfig(options, generatorBar);
  generateRoutes(options, generatorBar);
  generateLayouts(options, generatorBar);
  generateCss(options, generatorBar);
  generatePlugins(options, generatorBar);
  generateStores(options, generatorBar);
  generatorBar.stop();
  consola.success("Generation completed !");
};
