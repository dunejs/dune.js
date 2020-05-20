const Bundler = require("parcel-bundler");
const consola = require("consola");
const Path = require("path");

const generate = require("./generator/index");

const entryFiles = Path.join(__dirname, "../app/index.html");

module.exports = async function buildCmd(options) {
  generate(options);

  const bundlerOptions = {
    sourceMaps: false
  };

  const bundler = new Bundler(entryFiles, bundlerOptions);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
  });

  await bundler.bundle();
};
