太棒了 💪 用 **Google Cloud Shell** 是部署 Nuxt 到 Cloud Run 最簡單、最乾淨的方式，
不需要安裝任何東西！下面我給你完整可直接複製貼上的步驟 👇

---

## 🚀 在 Google Cloud Shell 部署 Nuxt 3 專案到 Cloud Run（Node 22 版本）

假設你的專案名稱是 **package-track**。
整個流程大概 5～10 分鐘就能跑起來。

---

### 🧩 步驟 1：開啟 Cloud Shell

1. 到 [Google Cloud Console](https://console.cloud.google.com/)
2. 右上角點擊 **「>_ Cloud Shell」**（圖示像終端機）
3. 等幾秒鐘開啟一個命令列環境（它自動登入你的帳號）

---

### 🧩 步驟 2：上傳你的專案

在 Cloud Shell 裡點右上角的「⋮」 → **Upload file(s)**
把你的整個 Nuxt 專案（通常是一個資料夾，例如 `package-track/`）壓縮成 zip 上傳。

然後解壓縮：

```bash
unzip package-track.zip -d package-track
cd package-track
```

> 📦 這裡的資料夾內應該有 `package.json`、`nuxt.config.ts` 等檔案。

---

### 🧩 步驟 3：建立 Dockerfile

在 Cloud Shell 裡執行：

```bash
nano Dockerfile
```

貼上這段（Node 22 + Nuxt 3 版本 👇）

```Dockerfile
# 使用 Node 22 LTS 版本（基於 Debian）
FROM node:22-slim

# 設定工作目錄
WORKDIR /app

# 安裝必要工具（有些套件需用到）
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# 複製相依檔案並安裝
COPY package*.json ./
RUN npm install

# 複製整個專案
COPY . .

# 建置 Nuxt 專案
RUN npm run build

# 設定埠號
ENV NITRO_PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080

# 啟動伺服器
CMD ["node", ".output/server/index.mjs"]
```

儲存並離開（按 `Ctrl+O` → Enter → `Ctrl+X`）

---

### 🧩 步驟 4：設定 GCP 專案

在 Cloud Shell 裡執行（把 `YOUR_PROJECT_ID` 換成實際專案 ID）：

```bash
gcloud config set project YOUR_PROJECT_ID
```

你可以在 Cloud Console 頁面上方找到你的 Project ID。

---

### 🧩 步驟 5：建置 Docker 映像

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/package-track
```

這會：

* 自動把你的專案打包上傳
* 建立 Docker 映像
* 儲存在 GCP 的 Container Registry 裡

第一次跑可能需要 3～5 分鐘。

---

### 🧩 步驟 6：部署到 Cloud Run

```bash
gcloud run deploy package-track \
  --image gcr.io/YOUR_PROJECT_ID/package-track \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated
```

> 🚀 等它跑完後，你會看到：
>
> ```
> Service URL: https://package-track-xxxxxx.a.run.app
> ```
>
> 這就是你 Nuxt 網站的公開網址！

---

### 🧩 步驟 7（可選）：設定環境變數

若你的專案有 `.env`，在 Cloud Run 裡可以設定：

```bash
gcloud run services update package-track \
  --update-env-vars NUXT_PUBLIC_BASE_URL=/package-track
```

---

## ✅ 完成！

你現在的 Nuxt 3 專案已經在 Cloud Run 上運行 🎉
（Google Cloud Shell 會自動保存所有憑證與設定）

---

是否要我幫你補上 **自動化部署腳本**（一個 `.sh` 檔一鍵 build + deploy）？
這樣你下次更新只要執行一行就能重新部署。
