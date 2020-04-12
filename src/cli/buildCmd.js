const Bundler = require("parcel-bundler");
const consola = require("consola");
const Path = require("path");

const generate = require("./generate");

const entryFiles = Path.join(__dirname, "../app/index.html");

module.exports = async function buildCmd(args) {
  generate(args);

  const options = {
    sourceMaps: false
  };

  const bundler = new Bundler(entryFiles, options);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
  });

  await bundler.bundle();
};
