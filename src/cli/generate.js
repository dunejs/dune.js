const routesGenerator = require("./routesGenerator");
const layoutsImporter = require("./layoutsImporter");
const generateFolder = require("./generateFolder");

module.exports = function generate(args) {
  generateFolder();
  routesGenerator(args.src);
  layoutsImporter(args.src);
};
