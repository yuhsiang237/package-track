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

export { formatTextareaJson };
