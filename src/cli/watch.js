const Bundler = require("parcel-bundler");
const consola = require("consola");
const Path = require("path");

const routesGenerator = require("./routesGenerator");
const layoutsImporter = require("./layoutsImporter");
const generateFolder = require("./generateFolder");

const entryFiles = Path.join(__dirname, "../app/index.pug");

module.exports = async function watchCmd(args) {
  generateFolder();
  routesGenerator(args.src);
  layoutsImporter(args.src);

  const bundler = new Bundler(entryFiles);

  bundler.on("buildStart", () => {
    consola.info("Build started !");
  });
  bundler.on("buildEnd", () => {
    consola.success("Build success !");
  });

  await bundler.serve();
};
