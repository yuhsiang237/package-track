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