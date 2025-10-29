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

function setPackagesData() {}

function getPackagesData() {}

export { getUserPackageData, setUserPackageData };
