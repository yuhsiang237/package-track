<template>
  <Loader />
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Loader from "~/components/Loader.vue";

const layout = ref<"default" | "mobile">("default");
const BREAKPOINT = 1062;

// 🧩 根據寬度回傳目前 layout
const getLayout = () => (window.innerWidth < BREAKPOINT ? "mobile" : "default");

const updateLayout = () => {
  const newLayout = getLayout();

  // 🔍 只在 layout 改變時觸發跳轉
  if (layout.value !== newLayout) {
    layout.value = newLayout;
    window.location.replace("/package-track"); // ✅ 每次 resize 超過臨界點就會回首頁
  }
};

onMounted(() => {
  layout.value = getLayout(); // 初始化
  window.addEventListener("resize", updateLayout);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateLayout);
});
</script>

<style lang="scss">
@use "~/assets/scss/main.scss" as *;
</style>
