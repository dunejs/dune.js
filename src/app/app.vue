<template lang="pug">
  component(:is="layout")
    router-view
</template>

<script lang="ts">
import Vue from "vue";
import config from "../../../../.generated/config";
import layouts from "../../../../.generated/layouts";

export default Vue.extend({
  head: config.head,
  components: layouts,
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
});
</script>
