// App import
import Vue from "vue";
import App from "./app.vue";

// Module import
import { router } from "./router";
import layouts from "../../../../.generated/layouts";
import meta from "./meta";

import "../../../../.generated/css";
import "../../../../.generated/plugins";

// Register module correctly
layouts(Vue);
meta(Vue);

// Create Vue app
new Vue({
  el: "#app",
  router,
  render: h => h(App)
});
