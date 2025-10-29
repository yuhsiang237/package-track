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
import { ref, onMounted, onUnmounted, computed, toRaw } from "vue";
import PackageCard from "~/components/PackageCard.vue";
import AddButton from "~/components/AddButton.vue";
import HelpButton from "~/components/HelpButton.vue";
import CheckboxToggle from "~/components/CheckboxToggle.vue";
import DropdownSelect from "~/components/DropdownSelect.vue";
import InputText from "~/components/InputText.vue";
import VModal from "~/components/VModal/VModal.vue";
import DownloadButton from "~/components/DownloadButton.vue";
import UploadButton from "~/components/UploadButton.vue";
import { getNpmPackageInfo } from "~/api/npm";
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
import { updateWidth } from "./utils/UIHelper";

const storedUserPackageData = ref<UserPackageData>(DEFAULT_USER_PACKAGE_DATA);
const userPackageJsonText = ref(
  JSON.stringify(toRaw(storedUserPackageData.value), null, 2),
);

const packages = ref<PackageItem[]>([]);
const keyword = ref<string>("");
const dayage = ref<string>("30");
const isEnableDayage = ref<boolean>(false);
const isEnableUpdate = ref<boolean>(true);
const isOpenModal = ref<boolean>(false);
const cardBarWitdh = ref(0);
const containerRef = ref<HTMLElement | null>(null);
const filteredPackages = computed(() =>
  packages.value.filter((item) => {
    // keyword 過濾
    const matchKeyword = !keyword.value || item.title.includes(keyword.value);
    // dayage 過濾
    const matchDay =
      !isEnableDayage.value || Number(item.timeAgo) <= Number(dayage.value);
    return matchKeyword && matchDay;
  }),
);

onMounted(() => {
  registerUpdateWidth();
  refreshUserPackageData();
  fetchPackage(Object.keys(storedUserPackageData.value));
});

onUnmounted(() => {
  unRegisterUpdateWidth();
});

function getUserPackageVersion(pkgName: string): string | null {
  const data = getUserPackageData();
  if (data) {
    try {
      const parsed = JSON.parse(data) as UserPackageData;
      const version = parsed[pkgName] || null;
      return version;
    } catch (err) {
      console.error("解析用戶套件資料失敗:", err);
      return null;
    }
  }
  return null;
}

async function fetchNpmPackage(pkgName: string): Promise<PackageItem | null> {
  const today = new Date().toISOString().split("T")[0];
  // 使用快取資料
  const cachedData = getPackageItemData();
  let cached = cachedData.find(
    (item) => item.title === pkgName && item.fetchDate === today,
  );
  if (cached) {
    console.log(`使用快取資料: ${pkgName}`);
    cached.oldVersion = getUserPackageVersion(pkgName) || "";
    return cached;
  }
  // 取得新資料
  try {
    const npmInfo = await getNpmPackageInfo(pkgName);
    return {
      title: npmInfo.name,
      currentVersion: npmInfo.latestVersion,
      oldVersion: getUserPackageVersion(pkgName) || "",
      timeAgo: `${daysAgo(npmInfo.releaseDate)}`,
      fetchDate: today,
    };
  } catch (err) {
    return {
      title: pkgName,
      currentVersion: "",
      oldVersion: getUserPackageVersion(pkgName) || "",
      timeAgo: `-`,
      fetchDate: "0001-01-01",
    };
  }
}

async function fetchPackage(packageNames: string[]) {
  try {
    const results = await Promise.all(
      packageNames.map((pkgName) => fetchNpmPackage(pkgName)),
    );
    packages.value = results.filter((pkg): pkg is PackageItem => pkg !== null);
    setPackageItemData(packages.value);
  } catch (err) {
    console.error("批量取得套件資訊失敗:", err);
  }
}

function refreshUserPackageData() {
  const data = getUserPackageData();
  if (data) {
    try {
      storedUserPackageData.value = JSON.parse(data);
    } catch (err) {
      console.error("解析用戶套件資料失敗:", err);
    }
  }
  // 統一更新 textarea 內容
  userPackageJsonText.value = JSON.stringify(
    storedUserPackageData.value,
    null,
    2,
  );
}

function save() {
  const prettyJSONString = toPrettyJSONString(userPackageJsonText.value);
  if (prettyJSONString) {
    userPackageJsonText.value = prettyJSONString;
    setUserPackageData(prettyJSONString);
  }
  refreshUserPackageData();
  fetchPackage(Object.keys(storedUserPackageData.value));

  isOpenModal.value = false;
}

function registerUpdateWidth() {
  updateWidth(cardBarWitdh, containerRef);
  window.addEventListener("resize", () =>
    updateWidth(cardBarWitdh, containerRef),
  );
}

function unRegisterUpdateWidth() {
  window.removeEventListener("resize", () =>
    updateWidth(cardBarWitdh, containerRef),
  );
}
</script>
