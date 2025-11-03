<template>
  <transition name="fade" appear>
    <div v-if="show" class="loader">
      <div class="loading-content">
        <div>
          <img :src="v3smallloading" alt="Logo" class="loader-logo" />
        </div>
        <div style="margin-left: 8px">
          <div class="loading-title">Package Trace Board</div>
          <div class="loading-sub">專注開發，隨時掌握版本動態。</div>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </transition>
</template>
<script setup>
import { ref, onMounted, watch } from "vue";
import v3smallloading from "~/assets/logo/P.png";

const show = ref(true);
const progress = ref(0);
let scrollTop = 0;

onMounted(() => {
  // 1. 記錄當前 scroll 位置
  scrollTop = window.scrollY || document.documentElement.scrollTop;

  // 2. 設定 body 固定
  document.body.style.position = "fixed";
  document.body.style.top = `-${scrollTop}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.overflow = "hidden";
  document.body.style.width = "100%";

  const interval = setInterval(() => {
    if (progress.value < 100) {
      const base = 1;
      const factor = progress.value / 20;
      const delta = base + factor + Math.random() * 2;
      progress.value = Math.min(progress.value + delta, 100);
    } else {
      clearInterval(interval);
      setTimeout(() => {
        show.value = false;
      }, 300);
    }
  }, 100);
});

watch(show, (val) => {
  if (!val) {
    // 解除固定，回到原 scroll 位置
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.overflow = "";
    document.body.style.width = "";
    window.scrollTo(0, scrollTop);
  }
});
</script>

<style scoped>
.loading-title {
  font-weight: 100;
  font-size: 25px;
  color: #e3ac40;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.loading-sub {
  color: #766c57;
}
.loading-content {
  display: flex;
}
.loader {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  z-index: 9999;
}

/* Logo 閃爍效果 */
.loader-logo {
  width: 55px;
  margin-top: 10px;
  margin-bottom: 0.5rem;
  animation: logo-fade 1.5s ease-in-out infinite;
}

@keyframes logo-fade {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

/* 短進度條 */
.progress-bar {
  margin-top: 8px;
  width: 160px;
  height: 6px;
  background-color: #ddd;
  border-radius: 3px;
  overflow: hidden;
  box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.1);
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #e3ac40, #e3ac40);
  width: 0%;
  transition: width 0.1s ease-out;
}

/* 淡出整個 loader */
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
