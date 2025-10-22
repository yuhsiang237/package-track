<template>
  <teleport to="body">
    <div
      v-if="visible"
      :class="$style.overlay"
      :style="overlayStyle"
      @click="onOverlayClick"
    >
      <div
        :class="[
          $style.modal,
          isOpen ? $style.open : $style.close,
          props.class, // ✅ 外部傳入的自訂樣式
        ]"
        :style="modalStyle"
        @click.stop
        @animationend="handleAnimationEnd"
      >
        <slot />
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";

/**
 * VModal 元件
 *
 * Props:
 * - isOpen：控制是否顯示 Modal。
 * - closeOnOverlayClick：是否允許點擊遮罩關閉，預設 false。
 * - width：Modal 寬度，可傳 number(px) 或 string(如 "80vw")。
 * - maxWidth：Modal 最大寬度，避免超過螢幕。
 * - height：Modal 高度，可傳 number(px) 或 string。
 * - maxHeight：Modal 最大高度，內容過長時可滾動。
 * - padding：內距，可傳 number(px) 或 string。
 * - zIndex：層級
 * Emits:
 * - update:isOpen：當使用者點遮罩或其他方式關閉。
 * - afterOpen：打開動畫結束後觸發。
 * - afterClose：關閉動畫結束後觸發。
 */
const props = withDefaults(
  defineProps<{
    isOpen: boolean;
    closeOnOverlayClick?: boolean;
    width?: string;
    maxWidth?: string;
    height?: string;
    maxHeight?: string;
    padding?: string;
    zIndex?: number;
    class?: string | string[] | Record<string, boolean>;
  }>(),
  {
    closeOnOverlayClick: false,
    width: "100%",
    height: "auto",
    padding: "24px 20px",
    zIndex: 1000,
  },
);

const emit = defineEmits<{
  (e: "update:isOpen", v: boolean): void;
  (e: "afterOpen"): void;
  (e: "afterClose"): void;
}>();

const isOpen = ref(props.isOpen);
const visible = ref(props.isOpen);
const closing = ref(false);

watch(
  () => props.isOpen,
  (val) => {
    isOpen.value = val;
    if (val) {
      visible.value = true;
      closing.value = false;
      emit("afterOpen");
    } else if (visible.value) {
      closing.value = true;
    }
  },
);

function handleAnimationEnd() {
  if (closing.value) {
    visible.value = false;
    closing.value = false;
    emit("afterClose");
  }
}

function onOverlayClick() {
  if (props.closeOnOverlayClick) {
    emit("update:isOpen", false);
  }
}

// 動態計算樣式
const modalStyle = computed(() => ({
  width: props.width,
  maxWidth: props.maxWidth,
  height: props.height,
  maxHeight: props.maxHeight,
  padding: props.padding,
}));

const overlayStyle = computed(() => ({
  zIndex: props.zIndex,
}));
</script>
<style module lang="scss" src="./VModal.module.scss"></style>
