import Vue from "vue/dist/vue.esm.js";
import Vuex from "vuex";
import createLogger from "vuex/dist/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";
const plugins = [];

import modules from "../stores";

if (debug) {
  plugins.push(createLogger());
}

export const store = new Vuex.Store({
  modules,
  strict: debug,
  plugins,
});
