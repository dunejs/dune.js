const fs = require("fs");
const Path = require("path");
const consola = require("consola");
const glob = require("glob");

module.exports = function layoutsImporter(appFolder) {
  const layoutsFolder = Path.join(process.cwd(), appFolder, "/layouts/");
  const layoutsFolderPrefix = Path.join("../", appFolder, "/layouts/");
  const layoutsFile = Path.join(process.cwd(), ".generated/layouts.ts");

  fs.closeSync(fs.openSync(layoutsFile, "w"));

  const stream = fs.createWriteStream(layoutsFile);

  stream.once("open", function (fd) {
    stream.write("export default {\n");
    glob(layoutsFolder + "*.vue", {}, (err, files) => {
      files.forEach((file) => {
        fileName = Path.basename(file, ".vue");

        stream.write(
          "'" +
            fileName +
            "-layout': () => import('" +
            layoutsFolderPrefix +
            fileName +
            ".vue'))\n"
        );
      });
      stream.write("}");
      stream.end();
    });
  });

  consola.info("Layouts imported !");
};
