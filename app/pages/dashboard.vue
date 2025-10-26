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
          <AddButton v-on:click="isOpenModal = true" />
        </div>
        <div>
          <HelpButton />
        </div>
      </div>
    </div>
    <VModal :isOpen="isOpenModal" class="addDashboardModal">
      <div class="modal-wrapper">
        <div class="action-bar">
          <DownloadButton />
          <UploadButton />
        </div>
        <div class="content">
          <textarea></textarea>
        </div>
        <div class="bottom-bar">
          <div class="cancel" v-on:click="isOpenModal = false">取消</div>
          <div class="save">儲存</div>
        </div>
      </div>
    </VModal>
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
import VModal from "~/components/VModal/VModal.vue";
import DownloadButton from "~/components/DownloadButton.vue";
import UploadButton from "~/components/UploadButton.vue";
import { getNpmPackageInfo, type NpmInfoRsp } from "~/api/npm";

// 套件名稱陣列
const packageNames = [
  "vue",
  "react",
  "@angular/core",
  "nuxt",
  "next",
  "gsap",
  "three",
  "pinia",
  "bootstrap",
  "i18n",
  "jest",
  "vitest",
  "sass",
  "yup",
  "vee-validate",
  "lodash",
  "dayjs",
];
// 定義卡片資料型別
interface PackageItem {
  title: string;
  currentVersion: string;
  oldVersion: string;
  timeAgo: string;
}

// 初始化 packages 陣列，指定型別
const packages = ref<PackageItem[]>([]);

// 結果陣列
const infos = ref<NpmInfoRsp[]>([]);
const error = ref("");

// 一次查多個套件資訊
const fetchAllNpmInfo = async () => {
  error.value = "";
  infos.value = [];

  try {
    const results = await Promise.all(
      packageNames.map(async (pkg) => {
        const res = await getNpmPackageInfo(pkg);
        return res;
      }),
    );
    packages.value = results.map(
      (it) =>
        ({
          title: it.name,
          currentVersion: it.latestVersion,
          oldVersion: it.latestVersion,
          timeAgo: `${daysAgo(it.releaseDate)} days ago`,
        }) as PackageItem,
    );
    infos.value = results;
  } catch (err) {
    error.value = "查詢時發生錯誤";
    console.error(err);
  }
};
/**
 * 計算指定日期距今多少天
 * @param date 日期（可以是 Date 物件或日期字串）
 * @returns 距今的天數（整數）
 */
function daysAgo(date: string | Date): number {
  const target = new Date(date);
  const now = new Date();

  // 只取日期部分，避免時區造成誤差
  const oneDay = 1000 * 60 * 60 * 24;
  const diffTime = now.getTime() - target.getTime();
  return Math.floor(diffTime / oneDay);
}

const isOpenModal = ref<boolean>(false);
const cardBarWitdh = ref(0);

onMounted(() => {
  fetchAllNpmInfo();
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
