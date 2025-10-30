<template>
  <div class="package-card" @click="openNpm">
    <VTooltip :title="toolTipText" trigger="hover">
      <div class="info-container">
        <div class="title-section">
          {{ truncatedTitle }}
        </div>
        <div class="version-section">
          <div
            class="version-current"
            :class="{ active: isUpdateHighlight && hasNewVersion }"
          >
            <svg
              width="5"
              height="6"
              viewBox="0 0 5 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse
                cx="2.72362"
                cy="3.26668"
                rx="2.13158"
                ry="2.31111"
                fill="#D07D09"
              />
            </svg>
            <div class="serial">
              <template v-if="currentVersion">{{ currentVersion }}</template>
              <template v-else>-</template>
            </div>
          </div>
          <div class="version-old">
            <svg
              width="5"
              height="6"
              viewBox="0 0 5 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.72388 1.16113C3.74428 1.16128 4.60474 2.06501 4.60474 3.22266C4.60453 4.3801 3.74416 5.28305 2.72388 5.2832C1.70348 5.2832 0.842245 4.3802 0.842041 3.22266C0.842041 2.06492 1.70336 1.16113 2.72388 1.16113Z"
                stroke="#E3AC40"
                stroke-width="0.5"
              />
            </svg>
            <div class="serial">
              <template v-if="oldVersion">{{ oldVersion }}</template>
              <template v-else>-</template>
            </div>
          </div>
        </div>
      </div>
      <div class="time">{{ timeAgo }}</div>
    </VTooltip>
  </div>
</template>

<script setup>
import { defineProps, computed, ref } from "vue";
import semver from "semver";
import VTooltip from "~/components/VTooltip.vue";
const props = defineProps({
  link: { type: String, default: "" },
  isUpdateHighlight: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  currentVersion: {
    type: String,
    default: "-",
  },
  oldVersion: {
    type: String,
    default: "-",
  },
  timeAgo: {
    type: String,
    default: "-",
  },
});
function openNpm() {
  window.open(props.link, "_blank");
}
const toolTipText = ref(
  `Package Name: ${props.title}<br/>New Version: ${props.currentVersion}<br/>Current Version: ${props.oldVersion}<br/>${props.timeAgo}`,
);

// computed 返回布林值
const hasNewVersion = computed(() =>
  semver.gt(props.currentVersion || "0.0.0", props.oldVersion || "0.0.0"),
);

// ✅ 限制 10 個字
const maxLength = 22;

// ✅ 若超過 10 字，則截斷 + "…"
const truncatedTitle = computed(() => {
  if (!props.title) return "";
  return props.title.length > maxLength
    ? props.title.slice(0, maxLength) + "…"
    : props.title;
});
</script>

<style scoped></style>
