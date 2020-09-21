import * as cliProgress from "cli-progress";
import * as chalk from "chalk";
const consola = require("consola");

import routesWatcher from "./routes";
import layoutsWatcher from "./layouts";
import storesWatcher from "./stores";

export default function(options: object) {
  const watcherBar = new cliProgress.SingleBar({
    format:
      "Watcher in progress... |" +
      chalk.red("{bar}") +
      "| {percentage}% || {value}/{total}",
    barCompleteChar: "\u2588",
    barIncompleteChar: "\u2591",
    hideCursor: true,
  });

  watcherBar.start(3, 0);

  routesWatcher(options, watcherBar);
  layoutsWatcher(options, watcherBar);
  storesWatcher(options, watcherBar);

  watcherBar.stop();
  consola.success("Watcher initialized !");
}
