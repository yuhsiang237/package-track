# 使用官方 Node.js 映像
FROM node:22-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package 檔案並安裝相依套件
COPY package*.json ./
RUN npm install

# 複製整個專案
COPY . .

# 建置 Nuxt 專案
RUN npm run build-ssr

# 設定運行環境變數
ENV NITRO_PORT=8080
ENV HOST=0.0.0.0

# 啟動伺服器
CMD ["node", ".output/server/index.mjs"]

# 開放 Cloud Run 預設埠
EXPOSE 8080
