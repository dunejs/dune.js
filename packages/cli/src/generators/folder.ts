import * as fs from "fs";
import * as Path from "path";

import { SingleBar } from "cli-progress";

export default function (generatorBar: SingleBar) {
  const generatedFolder = Path.join(process.cwd(), ".dunejs/");

  if (!fs.existsSync(generatedFolder)) {
    fs.mkdirSync(generatedFolder, { recursive: true });
  }

  generatorBar.increment();
}
