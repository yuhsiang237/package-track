<template>
  <div class="dashboard">
    <div class="card-bar" :style="{ width: cardBarWitdh + 'px' }">
      <div>
        <InputText placeholder="關鍵字過濾" />
      </div>
      <div style="display: flex">
        <CheckboxToggle label="" />
        <label>&nbsp;標記新版可升級</label>
      </div>
      <div style="display: flex; align-items: end">
        <CheckboxToggle />
        <label>&nbsp;僅顯示近&nbsp; &nbsp; </label>

        <DropdownSelect
          :options="[{ label: '30', value: '30' }]"
          modelValue="30"
        />

        <label>&nbsp; &nbsp; 天更新的套件</label>
      </div>
    </div>
    <div class="card-container" ref="containerRef">
      <PackageCard
        v-for="(item, index) in packages"
        :key="index"
        :title="item.title"
        :currentVersion="item.currentVersion"
        :oldVersion="item.oldVersion"
        :timeAgo="item.timeAgo"
      />
      <div class="card-action">
        <div>
          <AddButton />
        </div>
        <div>
          <HelpButton />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import PackageCard from "~/components/PackageCard.vue";
import AddButton from "~/components/AddButton.vue";
import HelpButton from "~/components/HelpButton.vue";
import CheckboxToggle from "~/components/CheckboxToggle.vue";
import DropdownSelect from "~/components/DropdownSelect.vue";
import InputText from "~/components/InputText.vue";

const cardBarWitdh = ref(0);
// 定義卡片資料型別
interface PackageItem {
  title: string;
  currentVersion: string;
  oldVersion: string;
  timeAgo: string;
}

// 初始化 packages 陣列，指定型別
const packages = ref<PackageItem[]>([]);

onMounted(() => {
  packages.value = Array.from({ length: 90 }, () => ({
    title: "Vue",
    currentVersion: "100.10.311110",
    oldVersion: "12000.2111.10",
    timeAgo: "22 days ago",
  }));
  packages.value.push({
    title: "asdaassaa1asdaassaa1asdaassaa1asdaassaa1asdaassaa11111",
    currentVersion: "100.10.311110",
    oldVersion: "12000.2111.10",
    timeAgo: "22 days ago",
  });
  packages.value.push({
    title: "Angular",
    currentVersion: "100.10.311110",
    oldVersion: "12000.2111.10",
    timeAgo: "22 days ago",
  });
});
const containerRef = ref<HTMLElement | null>(null);

// ✅ 專門計算容器的實際寬度
const getContainerActualWidth = () => {
  const container = containerRef.value;
  if (!container) return 0;

  const cards = Array.from(container.querySelectorAll(".package-card"));
  if (cards.length === 0) return 0;

  // 找出最右邊的卡片
  const rightmostCard = cards.reduce((prev, card) => {
    const prevRight = prev.getBoundingClientRect().right;
    const currRight = card.getBoundingClientRect().right;
    return currRight > prevRight ? card : prev;
  });

  // 計算容器左邊 → 最右卡片右邊的距離
  const containerRect = container.getBoundingClientRect();
  const cardRect = rightmostCard.getBoundingClientRect();
  const totalWidth = cardRect.right - containerRect.left;

  return totalWidth;
};

// ✅ 當 resize 或 mounted 時重新計算
const updateWidth = async () => {
  cardBarWitdh.value = 0;

  await nextTick();

  const width = getContainerActualWidth();
  cardBarWitdh.value = width;
  console.log("最右側卡片右端總寬：", width, "px");
};

onMounted(() => {
  updateWidth();
  window.addEventListener("resize", updateWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWidth);
});
</script>
