<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";

const layout = ref<"default" | "mobile">("default");

const updateLayout = () => {
  layout.value = window.innerWidth < 767 ? "mobile" : "default";
};

onMounted(() => {
  updateLayout();
  window.addEventListener("resize", updateLayout);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateLayout);
});
</script>

<style lang="scss">
@use "~/assets/scss/main.scss" as *;
</style>
