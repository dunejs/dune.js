import * as fs from "fs";
import * as Path from "path";
import * as glob from "glob";

import { SingleBar } from "cli-progress";

export default function(options: object | any, generatorBar: SingleBar | null) {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const srcDir = config.srcDir || options.config || "./";

  const layoutsFolder = Path.join(process.cwd(), srcDir, "/layouts/");
  const layoutsFolderPrefix = Path.join("../", srcDir, "/layouts/");
  const layoutsFile = Path.join(process.cwd(), ".dunejs/layouts.js");

  fs.closeSync(fs.openSync(layoutsFile, "w"));

  const stream = fs.createWriteStream(layoutsFile);

  stream.once("open", () => {
    stream.write("export default Vue => {\n");
    glob(layoutsFolder + "*.vue", {}, (_, files: string[]) => {
      files.forEach((file: string) => {
        const fileName = Path.basename(file, ".vue");

        stream.write(
          "Vue.component('" +
            fileName +
            "-layout', require('" +
            layoutsFolderPrefix +
            fileName +
            ".vue').default);\n"
        );
      });
      stream.write("};");
      stream.end();
    });
  });

  if (generatorBar !== null) {
    generatorBar.increment();
  }
}
