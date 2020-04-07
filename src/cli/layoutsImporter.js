const fs = require("fs");
const Path = require("path");
const consola = require("consola");
const glob = require("glob");

module.exports = function layoutsImporter(appFolder) {
  const layoutsFolder = Path.join(process.cwd(), appFolder, "/layouts/");
  const layoutsFolderPrefix = Path.join("../../../../", appFolder, "/layouts/");
  const layoutsFile = Path.join(__dirname, "../layouts/");

  if (!fs.existsSync(layoutsFile)) {
    fs.mkdirSync(layoutsFile, 0744);
  }

  fs.closeSync(fs.openSync(layoutsFile + "index.ts", "w"));

  const stream = fs.createWriteStream(layoutsFile + "index.ts");

  stream.once("open", function (fd) {
    stream.write("import Vue from 'vue';\n");
    glob(layoutsFolder + "*.vue", {}, (err, files) => {
      files.forEach((file) => {
        fileName = Path.basename(file, ".vue");

        stream.write(
          "Vue.component('" +
            fileName +
            "-layout', require('" +
            layoutsFolderPrefix +
            fileName +
            ".vue').default)\n"
        );
      });
      stream.end();
    });
  });

  consola.info("Layouts imported !");
};
