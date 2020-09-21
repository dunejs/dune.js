// Babel
import "core-js/stable";

// App import
import Vue from "vue/dist/vue.esm.js";
import App from "./app.vue";

// Module import
import { router } from "./router";
import { store } from "./vuex";
import layouts from "../../.dunejs/layouts";
import plugins from "../../.dunejs/plugins";
import meta from "./meta";

import config from "../../.dunejs/config";

import "../../.dunejs/css";

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
