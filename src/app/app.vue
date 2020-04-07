<template lang="pug">
  component(:is="layout")
    router-view
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  computed: {
    layout() {
      return (this.$route.meta.layout || "default") + "-layout";
    }
  }
});
</script>
