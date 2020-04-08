import Vue from "vue";
import Router from "vue-router";

// import generated routes
import routes from "../../../../.generated/routes";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: "history",
    routes,
  });
}
