const consola = require("consola");
import * as Path from "path";
const express = require("express");

const httpHost = process.env.HOST || "localhost";
const httpPort = process.env.PORT || 4000;
const launchFile = Path.join(process.cwd(), "./dist");

export default async function() {
  const app = express();

  app.set("port", httpPort);
  app.set("host", httpHost);

  app.use(express.static(launchFile));

  app.get("*", (_: any, res: any, __: any) => {
    res.sendFile(launchFile + "/index.html");
  });

  app.listen(app.get("port"), app.get("host"), () => {
    consola.success(
      "The server is running on http://" +
        app.get("host") +
        ":" +
        app.get("port")
    );
  });
}
