<template>
  <header class="mobile-nav">
    <div class="mobile-nav__top">
      <div class="mobile-nav__logo">
        <span class="logo-icon">
          <img class="logo" :src="PLogo" />
        </span>
        <span class="logo-text">Package Trace Board</span>
      </div>

      <!-- 🍔 兩條橫線動畫 -->
      <button class="menu-btn" :class="{ open: isOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
      </button>
    </div>

    <nav v-if="isOpen" class="mobile-nav__menu">
      <ul>
        <li>
          <NuxtLink class="bar-btn" to="/dashboard" @click="isOpen = false">
            Dashboard
            <PackageIcon />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="bar-btn" to="/info" @click="isOpen = false">
            Info
            <PackageIcon />
          </NuxtLink>
        </li>
        <li>
          <NuxtLink class="bar-btn" to="/setting" @click="isOpen = false">
            Setting
            <PackageIcon />
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PLogo from "~/assets/logo/P.png";

const isOpen = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
