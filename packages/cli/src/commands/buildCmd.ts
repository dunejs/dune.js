import * as Bundler from "parcel-bundler";
const consola = require("consola");
import generate from "../generators/index";
import * as Path from "path";

const entryFiles = Path.join(process.cwd(), ".dunejs/app/index.html");

export default async (options: object) => {
  generate(options);

  const bundlerOptions = {
    hmr: false,
    sourceMaps: false,
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
};
