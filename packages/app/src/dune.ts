// Babel
import "core-js/stable";

// App import
import Vue from "vue";
import App from "./app.vue";

// Module import
import { router } from "./router";
import { store } from "./vuex";
import layouts from "../layouts";
import plugins from "../plugins";
import meta from "./meta";

import config from "../config";

import "../css";

// Register module correctly
layouts(Vue);
meta(Vue);
plugins(Vue);

// Create Vue app
const appOptions = {
  el: "#app",
  router,
  store,
  render: (h) => h(App),
};

const customApp = config.options || {};

new Vue({ ...appOptions, ...customApp });
