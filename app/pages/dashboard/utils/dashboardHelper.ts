// textarea 失去焦點時自動格式化
function formatTextareaJson(jsontext: string): string {
  try {
    // ✅ 把 textarea 文字解析成物件（如果格式正確）
    const parsed = JSON.parse(jsontext);
    // ✅ 再 stringify 回漂亮格式
    jsontext = JSON.stringify(parsed, null, 2);
    return jsontext;
  } catch (err) {
    console.warn("⚠️ JSON 格式有誤，無法自動排版");
    return jsontext;
  }
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

function toPrettyJSONString(json: any): string | null {
  try {
    const parsed = JSON.parse(json);
    const pretty = JSON.stringify(parsed, null, 2);
    return pretty;
  } catch (err) {
    console.warn("⚠️ JSON 格式有誤，無法自動排版");
    return null;
  }
}

/**
 * 下載用戶資料為 JSON 檔案
 * @param content 要下載的 JSON 內容
 */
function downloadUserData(content: string) {
  try {
    // 取得當日日期並格式化為 YYYYMMDD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    // 生成檔案名稱
    const fileName = `package_track_${dateStr}.json`;

    // 格式化 JSON 內容
    const jsonContent = formatTextareaJson(content);

    // 建立 Blob
    const blob = new Blob([jsonContent], { type: "application/json" });

    // 建立下載連結
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    // 觸發下載
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 清理 URL 物件
    URL.revokeObjectURL(url);

    console.log(`成功下載檔案: ${fileName}`);
  } catch (error) {
    console.error("下載檔案失敗:", error);
  }
}
/**
 * 處理上傳的 package.json 檔案
 * @param file 上傳的檔案
 * @returns 解析後的套件物件或 null
 */
async function handlePackageJsonUpload(
  file: File,
): Promise<Record<string, string> | null> {
  if (!file) {
    return null;
  }

  // 檢查檔案類型
  if (!file.name.endsWith(".json")) {
    console.warn("⚠️ 請選擇 JSON 檔案");
    return null;
  }

  try {
    const content = await file.text();
    const packageData = JSON.parse(content);

    // 提取 dependencies 和 devDependencies 中的套件
    const dependencies = packageData.dependencies || {};
    const devDependencies = packageData.devDependencies || {};

    // 合併套件並移除版本號中的特殊符號 (^, ~, >=, <=, >, <, etc.)
    const cleanPackages: Record<string, string> = {};

    const cleanVersion = (version: string): string => {
      // 移除版本號前面的特殊符號
      return version.replace(/^[\^~><=]+/, "");
    };

    // 處理 dependencies
    Object.entries(dependencies).forEach(([name, version]) => {
      cleanPackages[name] = cleanVersion(String(version));
    });

    // 處理 devDependencies
    Object.entries(devDependencies).forEach(([name, version]) => {
      cleanPackages[name] = cleanVersion(String(version));
    });

    return cleanPackages;
  } catch (error) {
    console.error("解析 package.json 失敗:", error);
    return null;
  }
}

export {
  formatTextareaJson,
  daysAgo,
  toPrettyJSONString,
  downloadUserData,
  handlePackageJsonUpload,
};
