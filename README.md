# Package Track

前端套件版本檢視工具 - 幫助團隊快速掌握依賴套件的狀態與更新動態

## 簡介

目前團隊開發流程中，前端工程師需自行查看套件版本更新狀況，流程分散、耗時，導致：

- 難以及時掌握重大更新（如：React、Vue3、Next.js、SASS、Angular等）
- 缺乏統一的版本檢視機制，套件長期未升級可能引發安全性與相容性問題

為了解決以上問題，我們設計了一套「前端套件版本檢視工具」，協助團隊快速掌握依賴套件的狀態。

## 主要功能

### 集中化套件檢視
- 統一顯示所有專案的依賴套件版本資訊
- 支援多種格式的 package.json 檔案匯入
- 清晰的介面展示目前版本與最新版本

### 即時掌握更新動態
- 自動檢查套件是否有新版本可更新
- 提供詳細的版本差異資訊
- 支援過濾與排序功能，快速找到需要更新的套件

### 提升安全與相容性
- 顯示套件的安全性警告資訊
- 協助識別過時版本造成的相容性問題
- 提供更新建議與最佳實踐

## 技術架構

- **框架**: [Nuxt 4](https://nuxt.com/) - Vue.js 框架
- **UI**: 自定義 Vue 元件 + Popper.js 工具提示
- **樣式**: SASS/SCSS
- **API**: NPM Registry API
- **部署**: GitHub Pages (靜態網站)

## 快速開始

### 環境需求

- Node.js 18+
- npm

### 安裝依賴

```bash
# npm
npm install
```

### 開發模式

啟動開發伺服器於 `http://localhost:3000`：

```bash
# npm
npm run dev
```

### 生產部署

建置應用程式用於生產環境：

# 靜態版
```bash
# npm
npm run generate
```

# SSR後端渲染版
```bash
# npm
npm run build
```

本地預覽生產版本：

```bash
# npm
npm run preview
```

### 部署到 GitHub Pages

```bash
npm run deploy
```

## 專案結構

```
package-track/
├── app/
│   ├── api/           # API 端點
│   ├── components/    # Vue 元件
│   ├── models/        # 資料模型
│   ├── pages/         # 頁面組件
│   └── layouts/       # 佈局組件
├── public/            # 靜態資源
├── .nuxt/            # Nuxt 產生的檔案
└── .output/          # 建置輸出
```

## 主要頁面

- **首頁** (`/`) - 主要儀表板，顯示套件狀態總覽
- **設定頁** (`/setting`) - 管理套件列表與設定
- **資訊頁** (`/info`) - 專案說明與使用指南

## 開發指令

```bash
# 開發模式
npm run dev

# 程式碼格式化
npm run format

# ESLint 檢查
npm run lint

# 建置
npm run build

# 預覽
npm run preview

# 部署到 GitHub Pages
npm run deploy
```

## Design & Development

YU-HSIANG
