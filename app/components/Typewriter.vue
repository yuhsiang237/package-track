<template>
  <!-- displayTextWithHtml + cursor -->
  <div
    class="typewriter"
    v-html="displayTextWithHtml + '<span class=\'cursor\'>|</span>'"
  ></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// --------------------------
// Props 型別
// --------------------------
interface Props {
  texts?: string[]; // 可含 <br/> 或 \n
  speed?: number; // 打字速度 (毫秒/字)
  pause?: number; // 每行文字打完後停留毫秒
}

// --------------------------
// defineProps + 預設值
// --------------------------
const props = defineProps<Props>();

const texts = props.texts ?? ["Hello, Vue 3!"];
const speed = props.speed ?? 100;
const pause = props.pause ?? 1500;

// --------------------------
// Reactive 變數
// --------------------------
const displayText = ref(""); // 原始文字
const displayTextWithHtml = ref(""); // 帶 <br/> 的 HTML
let currentTextIndex = 0;
let charIndex = 0;
let timeoutId: number;

// --------------------------
// 打字效果
// --------------------------
const type = () => {
  const currentText = texts[currentTextIndex];

  if (charIndex < currentText.length) {
    displayText.value += currentText[charIndex];
    displayTextWithHtml.value = displayText.value.replace(/\n/g, "<br/>");
    charIndex++;
    timeoutId = window.setTimeout(type, speed);
  } else {
    timeoutId = window.setTimeout(() => {
      erase();
    }, pause);
  }
};

// --------------------------
// 刪除文字效果
// --------------------------
const erase = () => {
  if (charIndex > 0) {
    displayText.value = displayText.value.slice(0, -1);
    displayTextWithHtml.value = displayText.value.replace(/\n/g, "<br/>");
    charIndex--;
    timeoutId = window.setTimeout(erase, speed / 2);
  } else {
    currentTextIndex = (currentTextIndex + 1) % texts.length;
    timeoutId = window.setTimeout(type, speed);
  }
};

// --------------------------
// 生命週期
// --------------------------
onMounted(() => {
  type();
});

onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<style scoped>
.typewriter {
  font-size: 1.2rem;
  display: inline-block;
  white-space: pre; /* 保留空白和換行 */
}

.cursor {
  display: inline-block;
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50%,
  100% {
    opacity: 1;
  }
  25%,
  75% {
    opacity: 0;
  }
}
</style>
