<template>
  <div class="loading-spinner-wrapper">
    <div class="loading-spinner" :style="spinnerStyle"></div>
    <div class="text">Package Loading ...</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: number | string; // 旋轉圈大小（px 或 rem）
  color?: string; // 顏色
  thickness?: number; // 邊框厚度
}

const props = withDefaults(defineProps<Props>(), {
  size: 30,
  color: "#e3ac40", // 預設藍色（Element Plus 風格）
  thickness: 4,
});

const spinnerStyle = computed(() => ({
  width: typeof props.size === "number" ? `${props.size}px` : props.size,
  height: typeof props.size === "number" ? `${props.size}px` : props.size,
  border: `${props.thickness}px solid rgba(0,0,0,0.1)`,
  borderTop: `${props.thickness}px solid ${props.color}`,
}));
</script>

<style scoped>
.loading-spinner-wrapper {
  text-align: center;
}
.loading-spinner {
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.text {
  padding-top: 8px;
  font-size: 14px;
  color: #766c57;
}
</style>
