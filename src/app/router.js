import Vue from "vue";
import Router from "vue-router";

// import generated routes
import routes from "../../../../.generated/routes";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes
});
