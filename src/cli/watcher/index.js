const cliProgress = require("cli-progress");
const chalk = require("chalk");
const consola = require("consola");

const routesWatcher = require("./routes");
const layoutsWatcher = require("./layouts")

module.exports = function watcher(options) {
    const watcherBar = new cliProgress.SingleBar({
        format:
            "Watcher in progress... |" +
            chalk.red("{bar}") +
            "| {percentage}% || {value}/{total}",
        barCompleteChar: "\u2588",
        barIncompleteChar: "\u2591",
        hideCursor: true
    });

    watcherBar.start(2, 0);

    routesWatcher(options, watcherBar);
    layoutsWatcher(options, watcherBar);

    watcherBar.stop();
    consola.success("Watcher initialized !");
};
