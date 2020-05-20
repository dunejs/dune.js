// Babel
import "core-js/stable";
import "regenerator-runtime/runtime";

// App import
import Vue from "vue";
import App from "./app.vue";

// Module import
import { router } from "./router";
import layouts from "../../../../.dunejs/layouts";
import plugins from "../../../../.dunejs/plugins";
import meta from "./meta";

import config from "../../../../.dunejs/config";

import "../../../../.dunejs/css";

// Register module correctly
layouts(Vue);
meta(Vue);
plugins(Vue);

// Create Vue app
const appOptions = {
  el: "#app",
  router,
  render: h => h(App)
};

const customApp = config.options || {};
new Vue({ ...appOptions, ...customApp });
