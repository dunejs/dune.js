import * as fs from "fs";
import * as Path from "path";
import * as glob from "glob";

import { SingleBar } from "cli-progress";

export default function(options: object | any, generatorBar: SingleBar | any) {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const srcDir = config.srcDir || options.config || "./";

  const storesFolder = Path.join(process.cwd(), srcDir, "/store/");
  const storesFolderPrefix = Path.join("../", srcDir, "/store/");
  const storesFile = Path.join(process.cwd(), ".dunejs/stores.js");

  fs.closeSync(fs.openSync(storesFile, "w"));

  const stream = fs.createWriteStream(storesFile);

  stream.once("open", () => {
    glob(storesFolder + "*.js", {}, (_, files) => {
      files.forEach((file) => {
        const fileName = Path.basename(file);
        stream.write(
          "import " +
            Path.basename(file, ".js") +
            " from '" +
            storesFolderPrefix +
            fileName +
            "'\n"
        );
      });
      stream.write("export default {\n");
      glob(storesFolder + "*.js", {}, (_, files) => {
        files.forEach((file) => {
          const fileName = Path.basename(file, ".js");

          stream.write(fileName + ",\n");
        });
        stream.write("};");
        stream.end();
      });
    });
  });

  if (generatorBar !== null) {
    generatorBar.increment();
  }
}
