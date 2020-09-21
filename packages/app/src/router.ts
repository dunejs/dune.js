import Vue from "vue";
import Router from "vue-router";

// import generated routes
import routes from "../../../../.dunejs/routes";

Vue.use(Router);

export const router = new Router({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    next("/404");
  } else {
    next();
  }
});
