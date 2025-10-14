## 情境

因前端迭代速度快，能夠讓前端工程師在進行日常任務時，能夠知道哪些套件出了最新的版本，對於未來在版本升級/新寫法，能夠有效率的追蹤。

## 需求 / 解決方案

1. 能夠讓前端工程師能夠快速一覽
   =>解法:一進畫面有Dashboard快速導覽
2. 進行當前的套件檢閱
   =>解法:可以將前端用的package.json放入解析
3. 可以追蹤想追蹤的套件
   =>解法:提供儀錶板可以儲存或是有可以訂閱到信箱

```
前端技術日新月異，還在手動比對套件版本嗎？
讓我們的工具幫你省下麻煩！

無需安裝、立即使用，為你打造更高效率的前端升級流程。

由於前端技術演進迅速，框架與套件經常更新，若無有效追蹤機制，容易錯過重要升級或新功能的導入時機。

目前團隊開發流程中，前端工程師需自行查看套件版本更新狀況，流程分散、耗時，導致：

難以及時掌握重大更新（如 React、Next.js、Tailwind CSS 等）

缺乏統一的版本檢視機制

套件長期未升級可能引發安全性與相容性問題

為了解決以上問題，我們設計了一套「前端套件版本檢視工具」，協助團隊快速掌握依賴套件的狀態。

🎯 工具目標

幫助前端工程師快速檢視目前專案使用的套件狀態

追蹤各套件是否有新版本推出

為後續進行升級規劃與重構提供依據

🔧 功能需求與對應解法
需求	解決方案
能夠快速一覽目前套件狀態	提供 Dashboard 首頁，顯示套件更新摘要與升級建議
能夠進行套件版本解析與檢閱	允許使用者上傳/貼上 package.json 內容，進行即時解析
提供版本更新建議	顯示目前版本、最新版本、差異變化（例如：minor/major）、官方 changelog 連結
可篩選重大更新套件	支援版本差異分類（Patch / Minor / Major）與套件名稱篩選
界面簡潔、開箱即用	單頁式應用（SPA），免安裝即可使用

```

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
