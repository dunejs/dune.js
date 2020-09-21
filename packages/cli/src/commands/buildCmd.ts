import * as Bundler from "parcel-bundler";
const consola = require("consola");
import generate from "../generators/index";

const entryFiles = require.resolve("@dunejs/app/src/index.html");

export default async function(options: object) {
  generate(options);

  const bundlerOptions = {
    sourceMaps: false,
    hmr: false,
  };

  const bundler = new Bundler(entryFiles, bundlerOptions);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
    process.exit();
  });

  await bundler.bundle();
}
