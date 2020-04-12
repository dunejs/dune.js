<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import config from "../../../../.generated/config";

export default {
  head: config.head,
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    }
  }
};
</script>
