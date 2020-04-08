const routesGenerator = require("./routesGenerator");
const layoutsImporter = require("./layoutsImporter");
const generateFolder = require("./generateFolder");
const copyConfig = require("./copyConfig");
const generateCss = require("./generateCss");
const generatePlugins = require("./generatePlugins");

module.exports = function generate(args) {
  generateFolder();
  copyConfig(args.src);
  routesGenerator(args.src);
  layoutsImporter(args.src);
  generateCss(args.src);
  generatePlugins(args.src);
};
