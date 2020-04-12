import VueMeta from "vue-meta";

export default app => {
  app.use(VueMeta, {
    keyName: "head"
  });
};
