<template>
  <div class="intro">
    <h2>設定</h2>
    <p>
      異動結果會儲存於瀏覽器內存中，無需多做額外設定。<br />因儲存於瀏覽器內存中，因此若為不同電腦使用請點擊以下備份檔案進行匯出
      。
    </p>
    <div>
      <DownloadButton />
    </div>
  </div>
</template>
<script setup lang="ts">
import DownloadButton from "~/components/DownloadButton.vue";
</script>
