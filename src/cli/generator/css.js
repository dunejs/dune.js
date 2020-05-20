const fs = require("fs");
const Path = require("path");

module.exports = function generateCss(options, generatorBar) {
  const configPath = options.config || "./";
  const config = require(Path.join(
    process.cwd(),
    configPath,
    "./dune.config.js"
  ));
  const css = config.css || [];
  const srcDir = config.srcDir || options.config || "./";

  const cssFile = Path.join(process.cwd(), ".dunejs/css.js");

  fs.closeSync(fs.openSync(cssFile, "w"));

  const stream = fs.createWriteStream(cssFile);

  stream.once("open", function(fd) {
    css.forEach((file) => {
      if (file.startsWith(".")) {
        file = Path.join("../", srcDir, file);
      }
      stream.write("import '" + file + "'\n");
    });
    stream.end();
  });

  generatorBar.increment();
};
