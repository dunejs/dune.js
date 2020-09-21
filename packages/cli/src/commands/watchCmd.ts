import * as Bundler from "parcel-bundler";
const consola = require("consola");

import generate from "../generators/index";
import watcher from "../watchers/index";

const entryFiles = require.resolve("@dunejs/app/src/index.html");

export default async function (options: object) {
  generate(options);
  watcher(options);

  const bundler = new Bundler(entryFiles);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
  });

  await bundler.serve();
}
