const consola = require("consola");
import * as Path from "path";
import * as polka from "polka";
const sirv = require("sirv");

const httpHost = process.env.HOST || "localhost";
const httpPort = process.env.PORT || 4000;
const launchFile = Path.join(process.cwd(), "./dist");

export default async function() {
  polka()
    .use(sirv(launchFile, { single: true }))
    .listen(httpPort, httpHost, (err: string) => {
      if (err) consola.error(err);
      consola.success(
        `The server is running on http://${httpHost}:${httpPort}`
      );
    });
}
