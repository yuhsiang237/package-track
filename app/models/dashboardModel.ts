// 定義卡片資料型別
interface PackageItem {
  title: string;
  currentVersion: string;
  oldVersion: string;
  timeAgo: string;
  fetchDate?: string;
}

interface UserPackageData {
  [key: string]: string;
}

export type { PackageItem, UserPackageData };
