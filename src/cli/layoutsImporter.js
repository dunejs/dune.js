const fs = require("fs");
const Path = require("path");
const consola = require("consola");
const glob = require("glob");

module.exports = function layoutsImporter(appFolder) {
  const layoutsFolder = Path.join(process.cwd(), appFolder, "/layouts/");
  const layoutsFolderPrefix = Path.join("../", appFolder, "/layouts/");
  const layoutsFile = Path.join(process.cwd(), ".generated/layouts.js");

  fs.closeSync(fs.openSync(layoutsFile, "w"));

  const stream = fs.createWriteStream(layoutsFile);

  stream.once("open", function(fd) {
    stream.write("export default app => {\n");
    glob(layoutsFolder + "*.vue", {}, (err, files) => {
      files.forEach(file => {
        fileName = Path.basename(file, ".vue");

        stream.write(
          "app.component('" +
            fileName +
            "-layout', require('" +
            layoutsFolderPrefix +
            fileName +
            ".vue').default);\n"
        );
      });
      stream.write("};");
      stream.end();
    });
  });

  consola.info("Layouts imported !");
};
