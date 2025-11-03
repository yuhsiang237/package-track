<template>
  <Loader />
  <NuxtLayout v-if="pageReady" :name="layout">
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import Loader from "~/components/Loader.vue";
const pageReady = ref(false);
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

onMounted(async () => {
  // 延遲 300ms 再顯示頁面，避免先閃
  await new Promise((resolve) => setTimeout(resolve, 300));
  pageReady.value = true;
  layout.value = getLayout(); // 初始化
  window.addEventListener("resize", updateLayout);
  setMeta();
});

function setMeta() {
  const meta = document.createElement("meta");
  meta.name = "viewport";
  meta.content =
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no";

  // 先檢查是否已經存在，避免重複添加
  const existing = document.querySelector('meta[name="viewport"]');
  if (existing) {
    existing.remove();
  }

  document.head.appendChild(meta);
}
onBeforeUnmount(() => {
  window.removeEventListener("resize", updateLayout);
});
</script>

<style lang="scss">
@use "~/assets/scss/main.scss" as *;
</style>
