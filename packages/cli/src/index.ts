#!/usr/bin/env node
import * as prog from "caporal";
import * as pjson from "./package.json";

import watchCmd from "./commands/watchCmd";
import buildCmd from "./commands/buildCmd";
import startCmd from "./commands/startCmd";

prog
  .version(pjson.version)
  .command("watch", "Start the development server !")
  .option("--config <config>", "Config file path (optional).")
  .action((_: any, options: object, __: any) => {
    watchCmd(options);
  })
  .command("build", "Build the website !")
  .option("--config <config>", "Config file path (optional).")
  .action((_: any, options: object, __: any) => {
    buildCmd(options);
  })
  .command("start", "Start a web server !")
  .action(() => {
    startCmd();
  });

prog.parse(process.argv);
