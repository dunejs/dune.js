import * as fs from "fs";
import * as Path from "path";

import { SingleBar } from "cli-progress";

export default (generatorBar: SingleBar) => {
  const generatedFolder = Path.join(process.cwd(), ".dunejs/app");

  if (!fs.existsSync(generatedFolder)) {
    fs.mkdirSync(generatedFolder, { recursive: true });
  }

  generatorBar.increment();
};
