<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/info">說明頁</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped></style>
