import type { PackageItem } from "~/models/dashboardModel";

function setUserPackageData(data: any) {
  try {
    const parsed = JSON.parse(data);
    const pretty = JSON.stringify(parsed, null, 2);
    localStorage.setItem("userPackageData", pretty);
  } catch (err) {
    console.warn("⚠️ JSON 格式有誤，無法自動排版");
  }
}

function getUserPackageData(): string | null {
  return localStorage.getItem("userPackageData");
}

function setPackageItemData(items: PackageItem[]) {
  localStorage.setItem("packageItemData", JSON.stringify(items));
}

function getPackageItemData(): PackageItem[] {
  return JSON.parse(localStorage.getItem("packageItemData") || "[]");
}

export {
  getUserPackageData,
  setUserPackageData,
  getPackageItemData,
  setPackageItemData,
};
