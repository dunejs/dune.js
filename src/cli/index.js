#!/usr/bin/env node
const prog = require("caporal");
var pjson = require("../../package.json");

const watchCmd = require("./watchCmd");
const buildCmd = require("./buildCmd");
const startCmd = require("./startCmd");

prog
  .version(pjson.version)
  .command("watch", "Start the development server !")
  .option("--config <config>", "Config file path (optional).")
  .action(function(args, options, logger) {
    watchCmd(options);
  })
  .command("build", "Build the website !")
  .option("--config <config>", "Config file path (optional).")
  .action(function(args, options, logger) {
    buildCmd(options);
  })
  .command("start", "Start a web server !")
  .action(function() {
    startCmd();
  });

prog.parse(process.argv);
