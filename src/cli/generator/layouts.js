const fs = require("fs");
const Path = require("path");
const glob = require("glob");

module.exports = function generateLayouts(options, generatorBar) {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const srcDir = config.srcDir || options.config || "./";

  const layoutsFolder = Path.join(process.cwd(), srcDir, "/layouts/");
  const layoutsFolderPrefix = Path.join("../", srcDir, "/layouts/");
  const layoutsFile = Path.join(process.cwd(), ".dunejs/layouts.js");

  fs.closeSync(fs.openSync(layoutsFile, "w"));

  const stream = fs.createWriteStream(layoutsFile);

  stream.once("open", function (fd) {
    stream.write("export default Vue => {\n");
    glob(layoutsFolder + "*.vue", {}, (err, files) => {
      files.forEach(file => {
        const fileName = Path.basename(file, ".vue");

        stream.write(
          "Vue.component('" +
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

  if (generatorBar != null) {
    generatorBar.increment();
  }
};
