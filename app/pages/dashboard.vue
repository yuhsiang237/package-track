<template>
  <div class="dashboard">
    <div class="card-bar" :style="{ width: cardBarWitdh + 'px' }">
      <div>
        <InputText v-model="keyword" placeholder="關鍵字過濾" />
      </div>
      <div style="display: flex">
        <CheckboxToggle label="" v-model="isEnableUpdate" />
        <label>&nbsp;標記新版可升級</label>
      </div>
      <div style="display: flex; align-items: end">
        <CheckboxToggle label="" v-model="isEnableDayage" />
        <label>&nbsp;僅顯示近&nbsp; &nbsp; </label>
        <DropdownSelect
          v-model="dayage"
          :options="[
            { label: '7', value: '7' },
            { label: '14', value: '14' },
            { label: '30', value: '30' },
            { label: '45', value: '45' },
            { label: '90', value: '90' },
          ]"
        />

        <label>&nbsp; &nbsp; 天更新的套件</label>
      </div>
    </div>
    <div class="card-container" ref="containerRef">
      <PackageCard
        v-for="(item, index) in filteredPackages"
        :key="index"
        :title="item.title"
        :currentVersion="item.currentVersion"
        :oldVersion="item.oldVersion"
        :timeAgo="`${item.timeAgo} days ago`"
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
          <textarea v-model="jsonText" @blur="formatTextareaJson"></textarea>
        </div>
        <div class="bottom-bar">
          <div class="cancel" v-on:click="isOpenModal = false">取消</div>
          <div class="save" v-on:click="save">儲存</div>
        </div>
      </div>
    </VModal>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, computed, toRaw } from "vue";
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

// textarea 失去焦點時自動格式化
function formatTextareaJson() {
  try {
    // ✅ 把 textarea 文字解析成物件（如果格式正確）
    const parsed = JSON.parse(jsonText.value);
    // ✅ 再 stringify 回漂亮格式
    jsonText.value = JSON.stringify(parsed, null, 2);
  } catch (err) {
    console.warn("⚠️ JSON 格式有誤，無法自動排版");
  }
}

const userPackageData = ref<Record<string, string>>({
  vue: "3.5.22",
  react: "19.2.0",
  "@angular/core": "19.2.0",
});
// 初始化 textarea — 這裡一定要是漂亮 JSON，不是 JSON.stringify(JSON.stringify(...))
const jsonText = ref(JSON.stringify(toRaw(userPackageData.value), null, 2));

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
const keyword = ref<string>("");
const dayage = ref<string>("30");
const isEnableDayage = ref<boolean>(false);
const isEnableUpdate = ref<boolean>(true);

// 過濾列表
const filteredPackages = computed(() => {
  return packages.value.filter((item) => {
    // keyword 過濾
    const matchKeyword = !keyword.value || item.title.includes(keyword.value);

    // dayage 過濾，只有啟用時才判斷
    const matchDay =
      !isEnableDayage.value || Number(item.timeAgo) <= Number(dayage.value);

    return matchKeyword && matchDay;
  });
});
// 結果陣列
const infos = ref<NpmInfoRsp[]>([]);

const error = ref("");
const fetchAllNpmInfo = async () => {
  error.value = "";
  infos.value = [];

  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const cachedData: Record<string, PackageItem> = JSON.parse(
      localStorage.getItem("packagesData") || "{}",
    );
    const cachedDates: Record<string, string> = JSON.parse(
      localStorage.getItem("packagesDates") || "{}",
    );

    const results: PackageItem[] = [];

    // 使用 Promise.all 讓 API 可以同時請求，提高效率
    const promises = packageNames.map(async (pkg) => {
      if (cachedDates[pkg] === today && cachedData[pkg]) {
        console.log(`使用快取資料: ${pkg}`);
        return cachedData[pkg];
      }

      const res = await getNpmPackageInfo(pkg); // 你的 API 函式
      const pkgInfo: PackageItem = {
        title: res.name,
        currentVersion: res.latestVersion,
        oldVersion: res.latestVersion,
        timeAgo: `${daysAgo(res.releaseDate)}`,
      };

      // 更新快取
      cachedData[pkg] = pkgInfo;
      cachedDates[pkg] = today;

      return pkgInfo;
    });

    const pkgResults = await Promise.all(promises);
    packages.value = pkgResults;
    infos.value = pkgResults;

    localStorage.setItem("packagesData", JSON.stringify(cachedData));
    localStorage.setItem("packagesDates", JSON.stringify(cachedDates));
  } catch (err) {
    error.value = "查詢時發生錯誤";
    console.error(err);
  }
};

// ✅ 頁面載入時：讀取 localStorage
onMounted(() => {
  const saved = localStorage.getItem("userPackageData");
  console.log(saved);
  if (saved) {
    try {
      // 如果是合法 JSON，就載入成物件
      userPackageData.value = JSON.parse(saved);
      // 同時更新 textarea 顯示
      jsonText.value = JSON.stringify(userPackageData.value, null, 2);
      console.log("✅ 已載入 localStorage 資料");
    } catch (err) {
      console.warn("⚠️ 無法解析 localStorage JSON，使用預設值");
      jsonText.value = JSON.stringify(userPackageData.value, null, 2);
    }
  } else {
    // 沒有資料 → 顯示預設
    jsonText.value = JSON.stringify(userPackageData.value, null, 2);
  }
});

function save() {
  try {
    const parsed = JSON.parse(jsonText.value);
    const pretty = JSON.stringify(parsed, null, 2);

    // ✅ 更新 textarea 顯示
    jsonText.value = pretty;

    // ✅ 存進 localStorage
    localStorage.setItem("userPackageData", pretty);

    console.log("✅ 已美化並儲存到 localStorage");
  } catch (err) {
    console.warn("⚠️ JSON 格式有誤，無法自動排版");
  }

  isOpenModal.value = false;
}

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
