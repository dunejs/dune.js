import * as fs from "fs";
import * as Path from "path";

import { SingleBar } from "cli-progress";

export default (options: object | any, generatorBar: SingleBar) => {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const css: string[] = config.css || [];
  const srcDir: string = config.srcDir || options.config || "./";

  const cssFile: string = Path.join(process.cwd(), ".dunejs/css.js");

  fs.closeSync(fs.openSync(cssFile, "w"));

  const stream: fs.WriteStream = fs.createWriteStream(cssFile);

  stream.once("open", () => {
    css.forEach((file: string) => {
      if (file.startsWith(".")) {
        file = Path.join("../", srcDir, file);
      }
      stream.write(`import ${file} \n`);
    });
    stream.end();
  });

  generatorBar.increment();
};
