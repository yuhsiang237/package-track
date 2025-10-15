<template>
  <div class="header">
    <div class="title-container">
      <div class="title">Package Trace Board</div>
      <div class="tag">FRONT-END</div>
    </div>
    <div class="intro">
      <Typewriter
        :texts="[
          '自動化監控前端套件更新，穩定追蹤。\n專注開發，隨時掌握版本動態。',
        ]"
        :speed="100"
        :pause="1500"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Typewriter from "~/components/Typewriter.vue";
</script>
