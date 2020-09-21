import * as fs from "fs";
import * as Path from "path";

import { SingleBar } from "cli-progress";

export default function (options: object | any, generatorBar: SingleBar) {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const plugins = config.plugins || [];
  const srcDir = config.srcDir || options.config || "./";
  const pluginsFile = Path.join(process.cwd(), ".dunejs/plugins.js");

  fs.closeSync(fs.openSync(pluginsFile, "w"));

  const stream = fs.createWriteStream(pluginsFile);

  stream.once("open", () => {
    plugins.forEach((file: string) => {
      if (file.startsWith(".")) {
        file = Path.join("../", srcDir, file);
      }
      stream.write(
        "import " + Path.basename(file, ".js") + " from'" + file + "'\n"
      );
    });
    stream.write("export default Vue => {\n");
    plugins.forEach((file: string) => {
      const fileName = Path.basename(file, ".js");

      stream.write(fileName + "(Vue)\n");
    });
    stream.write("};");
    stream.end();
  });

  generatorBar.increment();
}
