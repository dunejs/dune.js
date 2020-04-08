#!/usr/bin/env node
const prog = require("caporal");
var pjson = require("../../package.json");

const watchCmd = require("./watchCmd");
const buildCmd = require("./buildCmd");
const startCmd = require("./startCmd");

prog
  .version(pjson.version)
  .command("watch", "Start the development server !")
  .argument("<src>", "Source folder where the app sit.")
  .action(function (args, options, logger) {
    watchCmd(args);
  })
  .command("build", "Build the website !")
  .argument("<src>", "Source folder where the app sit.")
  .action(function (args, options, logger) {
    buildCmd(args);
  })
  .command("start", "Start a web server !")
  .action(function () {
    startCmd();
  });

prog.parse(process.argv);
