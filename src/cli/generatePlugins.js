const fs = require("fs");
const Path = require("path");
const consola = require("consola");

module.exports = function generatePlugins(appFolder) {
  const pluginsFile = Path.join(process.cwd(), ".generated/plugins.js");

  const config = require("../../../../.generated/config").plugins;

  fs.closeSync(fs.openSync(pluginsFile, "w"));

  const stream = fs.createWriteStream(pluginsFile);

  stream.once("open", function(fd) {
    config.forEach(file => {
      if (file.startsWith(".")) {
        file = Path.join("../", appFolder, file);
      }
      stream.write("import '" + file + "'\n");
    });
    stream.end();
  });

  consola.info("Plugins generated !");
};
