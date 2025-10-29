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
          <textarea
            v-model="userPackageJsonText"
            @blur="
              userPackageJsonText = formatTextareaJson(userPackageJsonText)
            "
          ></textarea>
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
import type { PackageItem, UserPackageData } from "~/models/dashboardModel";

import {
  formatTextareaJson,
  toPrettyJSONString,
  daysAgo,
} from "./utils/dashboardHelper";
import {
  getUserPackageData,
  setUserPackageData,
  setPackageItemData,
  getPackageItemData,
} from "./utils/storageHelper";
import { DEFAULT_USER_PACKAGE_DATA } from "./utils/constant";

const storedUserPackageData = ref<UserPackageData>(DEFAULT_USER_PACKAGE_DATA);
const userPackageJsonText = ref(
  JSON.stringify(toRaw(storedUserPackageData.value), null, 2),
);

// 套件名稱陣列
const packageNames = Object.keys(DEFAULT_USER_PACKAGE_DATA);
// 初始化 packages 陣列，指定型別
const packages = ref<PackageItem[]>([]);
const keyword = ref<string>("");
const dayage = ref<string>("30");
const isEnableDayage = ref<boolean>(false);
const isEnableUpdate = ref<boolean>(true);
const isOpenModal = ref<boolean>(false);
const cardBarWitdh = ref(0);
const containerRef = ref<HTMLElement | null>(null);
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

const error = ref("");

onMounted(() => {
  registerUpdateWidth();
  fetchAllNpmInfo();
  initUserPackageData();
});

onUnmounted(() => {
  unRegisterUpdateWidth();
});

async function fetchAllNpmInfo() {
  error.value = "";

  try {
    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const packageItemData: PackageItem[] = getPackageItemData();

    const promises = packageNames.map(async (pkg) => {
      // 檢查是否有今天快取的資料
      const cachedItem = packageItemData.find(
        (item) => item.title === pkg && item.fetchDate === today,
      );
      if (cachedItem) {
        console.log(`使用快取資料: ${pkg}`);
        return cachedItem;
      }
      const res = await getNpmPackageInfo(pkg);
      const pkgInfo: PackageItem = {
        title: res.name,
        currentVersion: res.latestVersion,
        oldVersion: res.latestVersion,
        timeAgo: `${daysAgo(res.releaseDate)}`,
        fetchDate: today,
      };

      return pkgInfo;
    });

    const pkgResults = await Promise.all(promises);
    packages.value = pkgResults;

    // 儲存完整的 PackageItem 陣列到 localStorage
    setPackageItemData(pkgResults);
  } catch (err) {
    error.value = "查詢時發生錯誤";
    console.error(err);
  }
}

function initUserPackageData() {
  const pkgData = getUserPackageData();
  if (pkgData) {
    try {
      storedUserPackageData.value = JSON.parse(pkgData);
      // 更新 textarea
      userPackageJsonText.value = JSON.stringify(
        storedUserPackageData.value,
        null,
        2,
      );
    } catch (err) {
      userPackageJsonText.value = JSON.stringify(
        storedUserPackageData.value,
        null,
        2,
      );
    }
  } else {
    userPackageJsonText.value = JSON.stringify(
      storedUserPackageData.value,
      null,
      2,
    );
  }
}

function save() {
  const prettyJSONString = toPrettyJSONString(userPackageJsonText.value);
  if (prettyJSONString) {
    userPackageJsonText.value = prettyJSONString;
    setUserPackageData(prettyJSONString);
  }
  isOpenModal.value = false;
}

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

function registerUpdateWidth() {
  updateWidth();
  window.addEventListener("resize", updateWidth);
}

function unRegisterUpdateWidth() {
  window.removeEventListener("resize", updateWidth);
}
</script>
