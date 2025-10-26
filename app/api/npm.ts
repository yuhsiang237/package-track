// src/api/npm.ts
import axios from "axios";

export interface NpmInfoRsp {
  name: string;
  latestVersion: string;
  releaseDate: string;
}

/**
 * 取得 npm 套件的最新版本與發佈日期
 * @param key 套件名稱，例如 'react' 或 'vue'
 */
export const getNpmPackageInfo = async (key: string): Promise<NpmInfoRsp> => {
  try {
    const url = `https://registry.npmjs.org/${encodeURIComponent(key)}`;
    const res = await axios.get(url);
    const data = res.data;

    const latestVersion = data["dist-tags"].latest;
    const releaseDate = data.time[latestVersion];

    return {
      name: data.name,
      latestVersion,
      releaseDate,
    };
  } catch (err) {
    console.error("[NPM API Error]", err);
    throw new Error("取得 npm 資料時發生錯誤");
  }
};
