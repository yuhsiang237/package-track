<template>
  <div class="default_layout">
    <div class="layout__sidebar">
      <Sidebar />
    </div>
    <div class="layout__content">
      <div class="content__section">
        <div class="content__header">
          <Header />
        </div>
        <div class="content__main">
          <slot />
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<script setup lang="ts">
import Header from "~/components/Header.vue";
import Sidebar from "~/components/Sidebar.vue";
import Footer from "~/components/Footer.vue";
</script>
