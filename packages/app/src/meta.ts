import VueMeta from "vue-meta";

export default (Vue) => {
  Vue.use(VueMeta, {
    keyName: "head",
  });
};
