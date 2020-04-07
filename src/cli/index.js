#!/usr/bin/env node
const prog = require("caporal");
var pjson = require("../../package.json");

const watchCmd = require(".//watch");
prog
  .version(pjson.version)
  .command("watch", "Start the development server !")
  .argument("<src>", "Source folder where the app sit.")
  .action(function (args, options, logger) {
    watchCmd(args);
  });

prog.parse(process.argv);
