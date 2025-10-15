<template>
  <div class="sidebar">
    <div>
      <NuxtImg class="logo" src="/logo/P.png"></NuxtImg>
    </div>

    <div class="bar-container">
      <div>
        <NuxtLink
          class="bar-btn"
          :class="{ 'router-link-active': isDashboardActive }"
          to="/dashboard"
        >
          <PackageIcon />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink class="bar-btn" to="/info">
          <InfoIcon />
        </NuxtLink>
      </div>
      <div>
        <NuxtLink class="bar-btn" to="/setting">
          <SettingIcon />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import InfoIcon from "~/assets/icons/InfoIcon.vue";
import PackageIcon from "~/assets/icons/PackageIcon.vue";
import SettingIcon from "~/assets/icons/SettingIcon.vue";
import { computed } from "vue";
import { useRoute } from "#app";

const route = useRoute();

const isDashboardActive = computed(() => {
  return route.path === "/" || route.path.startsWith("/dashboard");
});
</script>
