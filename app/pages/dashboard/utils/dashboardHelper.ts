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

export { formatTextareaJson, daysAgo, toPrettyJSONString };
