#!/usr/bin/env node

const Bundler = require("parcel-bundler");
const Path = require("path");
const fs = require("fs");
const { generateRoutes } = require("vue-route-generator");

const entryFiles = Path.join(__dirname, "./app/index.pug");
const arguments = process.argv.slice(2);

const appFolder = Path.join(arguments[1]);
const pagesFolder = Path.join(process.cwd(), appFolder, "/pages/");
const pagesFolderPrefix = Path.join("../../../../", appFolder, "/pages/");
const routesFile = Path.join(__dirname, "/router/routes.ts");

// Generate routes
const routes = generateRoutes({
  pages: pagesFolder,
  importPrefix: pagesFolderPrefix,
});
fs.writeFileSync(routesFile, routes);

// Initializes a bundler using the entrypoint location and options provided
const bundler = new Bundler(entryFiles);

async function dev() {
  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  const bundle = await bundler.serve();
}

if (arguments[0] == "dev" && arguments[1] != null) {
  dev();
} else {
  console.log("no or missing arguments");
}
