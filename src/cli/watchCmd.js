const Bundler = require("parcel-bundler");
const consola = require("consola");
const Path = require("path");

const generate = require("./generator/index");
const filesWatcher = require("./filesWatcher");

const entryFiles = Path.join(__dirname, "../app/index.html");

module.exports = async function watchCmd(options) {
  generate(options);
  //filesWatcher(options);

  const bundler = new Bundler(entryFiles);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
  });

  await bundler.serve();
};
