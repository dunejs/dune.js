const fs = require("fs");
const Path = require("path");
const consola = require("consola");

module.exports = function generateCss(appFolder) {
  const cssFile = Path.join(process.cwd(), ".generated/css.ts");

  const config = require("../../../../.generated/config").css;

  fs.closeSync(fs.openSync(cssFile, "w"));

  const stream = fs.createWriteStream(cssFile);

  stream.once("open", function (fd) {
    config.forEach((file) => {
      if (file.startsWith(".")) {
        file = Path.join("../", appFolder, file);
      }
      stream.write("import '" + file + "'\n");
    });
    stream.end();
  });

  consola.info("CSS generated !");
};
