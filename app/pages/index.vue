<template>
  <template v-if="layout === 'default'">
    <Dashboard />
  </template>
  <template v-else> <MDashboard /> </template>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Dashboard from "~/pages/dashboard/index.vue";
import MDashboard from "~/pages/mdashboard/index.vue";

const layout = ref<"default" | "mobile">("default");

const updateLayout = () => {
  layout.value = window.innerWidth < 1062 ? "mobile" : "default";
};

onMounted(() => {
  updateLayout();
  window.addEventListener("resize", updateLayout);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateLayout);
});
</script>
