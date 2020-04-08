const consola = require("consola");
const Path = require("path");
const express = require("express");

const httpHost = process.env.HOST || "localhost";
const httpPort = process.env.PORT || 4000;
const launchFile = Path.join(process.cwd(), "./dist");

module.exports = async function startCmd() {
  const app = express();

  app.set("port", httpPort);
  app.set("host", httpHost);

  app.use(express.static(launchFile));

  app.get("*", (req, res, next) => {
    res.sendFile(launchFile + "/index.html");
  });

  const server = app.listen(app.get("port"), app.get("host"), function () {
    consola.success(
      "The server is running on http://" +
        app.get("host") +
        ":" +
        app.get("port")
    );
  });
};
