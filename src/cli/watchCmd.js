const Bundler = require("parcel-bundler");
const consola = require("consola");
const Path = require("path");

const generate = require("./generate");
const filesWatcher = require("./filesWatcher");

const entryFiles = Path.join(__dirname, "../app/index.pug");

module.exports = async function watchCmd(args) {
  generate(args);
  filesWatcher(args);

  const bundler = new Bundler(entryFiles);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
  });

  await bundler.serve();
};
