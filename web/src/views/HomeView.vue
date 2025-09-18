<template>
  <div class="editor">
    <!-- 左邊預覽畫面 -->
    <div class="preview">
      <div class="preview-header">Untitled ✏️</div>
      <div class="preview-body">
        <!-- 用 v-html 直接把 HTML 顯示出來 -->
        <div>{{ parsedPackages  }}</div>
      </div>
    </div>

    <!-- 右邊編輯器 -->
    <div class="panels">
      <!-- HTML -->
      <div class="panel html">
        <textarea v-model="packagetxt" placeholder="Write HTML here..."></textarea>
      </div>

      <!-- CSS -->
      <div class="panel css">
        <textarea v-model="cssCode" placeholder="Write CSS here..."></textarea>
      </div>

      <!-- JS -->
      <div class="panel js">
        <textarea v-model="jsCode" placeholder="Write JS here..."></textarea>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch ,computed} from "vue";

const packagetxt = ref("");
const cssCode = ref("h1 { color: red; }");
const jsCode = ref("console.log('Hello from JS');");
const parsedPackages = computed(() => {
  try {
    const obj = JSON.parse(packagetxt.value);
    return extractPackages(obj);
  } catch (e) {
    return []; // JSON 格式錯誤就回傳空陣列
  }
});
/**
 * 將 package.json 的 dependencies 和 devDependencies 合併並整理版本
 * @param {object} pkgJson - package.json 物件
 * @returns {Array<{name: string, version: string}>}
 */
function extractPackages(pkgJson) {
  const dependencies = pkgJson.dependencies || {};
  const devDependencies = pkgJson.devDependencies || {};

  return [
    ...Object.entries(dependencies),
    ...Object.entries(devDependencies)
  ].map(([name, version]) => ({
    name,
    version: version.replace(/[^0-9.]/g, '') // 只保留數字和 .
  }));
}

/* 把 CSS 動態加到 head */
watch(cssCode, (newCss) => {
  let styleTag = document.getElementById("dynamic-style");
  if (!styleTag) {
    styleTag = document.createElement("style");
    styleTag.id = "dynamic-style";
    document.head.appendChild(styleTag);
  }
  styleTag.innerHTML = newCss;
});

/* 把 JS 動態執行 */
watch(jsCode, (newJs) => {
  try {
    // 清除舊的 script
    let oldScript = document.getElementById("dynamic-script");
    if (oldScript) oldScript.remove();

    // 插入新 script
    const script = document.createElement("script");
    script.id = "dynamic-script";
    script.innerHTML = newJs;
    document.body.appendChild(script);
  } catch (e) {
    console.error("JS 錯誤:", e);
  }
});
</script>

<style lang="scss" scoped>
.editor {
  display: flex;
  height: 100vh;
  background: #1e1e1e;
  color: #fff;

  .preview {
    flex: 2;
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #000;

    .preview-header {
      background: #000;
      color: #fff;
      padding: 10px;
      font-weight: bold;
    }

    .preview-body {
      flex: 1;
      padding: 20px;
      overflow: auto;
    }
  }

  .panels {
    flex: 1.2;
    display: flex;
    flex-direction: column;
    background: #111;

    .panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      border-bottom: 1px solid #333;

      textarea {
        flex: 1;
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background: #1e1e1e;
        color: #fff;
        font-size: 14px;
        font-family: monospace;
        resize: none;
        padding: 10px;
        box-sizing: border-box;
      }

      &.html textarea {
        color: #e34c26;
      }
      &.css textarea {
        color: #264de4;
      }
      &.js textarea {
        color: #f7df1e;
      }
    }
  }
}
</style>
