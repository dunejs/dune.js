<template lang="pug">
  component(:is="layout")
    router-view
</template>

<script lang="ts">
import Vue from "vue";
import layouts from "../../../../.generated/layouts";

export default Vue.extend({
  components: layouts,
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    },
  },
});
</script>
