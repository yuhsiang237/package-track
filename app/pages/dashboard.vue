<template>
  <div class="dashboard">
    <div class="card-container">
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
import { ref, onMounted } from "vue";
import PackageCard from "~/components/PackageCard.vue";
import AddButton from "~/components/AddButton.vue";
import HelpButton from "~/components/HelpButton.vue";

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
  packages.value = Array.from({ length: 15 }, () => ({
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
</script>
