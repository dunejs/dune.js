import * as Path from "path";
const consola = require("consola");

import { SingleBar } from "cli-progress";
import { ncp } from "ncp";

export default function(generateBar: SingleBar) {
  const dune = Path.join(
    Path.dirname(require.resolve("@dunejs/app/package.json")),
    "/src/"
  );
  const generatedFolder = Path.join(process.cwd(), ".dunejs/app/");

  ncp(dune, generatedFolder, (err) => {
    if (err) {
      return consola.error(err);
    }
  });

  generateBar.increment();
}
