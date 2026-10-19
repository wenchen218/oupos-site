# OUPOS 官方形象網站 — Apple 式捲動展示版

這是一個**可直接部署的靜態網站**。使用 `DESIGN-apple.md` 描述的產品展示排版語彙，但保留 OUPOS 原有的品牌色（`#8EAFCA`、`#7E9FBC`、`#FF8A45`）。網站並非 Apple 官方網站，也不使用 Apple 商標或未授權的網頁素材。

## 網站內容

- 大字產品首頁，完整 iPad POS 介面示意
- 六個隨捲動變化的操作場景：選商品、加入購物車、調整配料、現金結帳、線上訂單、營運報表
- 捲動時進場的功能區塊；提供「上一個 / 下一個」按鈕，尊重減少動態效果系統設定
- 可實際點擊的示範 POS：點餐、付款、線上訂單、報表、掃碼、設定
- 三個方案卡片與完整比較表：開源社群、專業支援、多店營運
- FAQ、App Store 和 GitHub 入口
- 電腦、平板、手機適應式排版

## 價格與服務聲明

唯一確定的現況是 **OUPOS 目前免費開源**；因此網站中「開源社群版」標示 `NT$0`。另外兩種方案僅是**設計與產品規劃示意**，沒有虛構價格、正式上線時間或承諾尚未完成的功能。對外正式推出前，請自行確認定價、功能及服務條款，修改 `index.html` 中的 `#pricing` 區塊。

## 設定下載網址

開啟 `app.js`，修改頂部的：

```js
const SITE_LINKS = {
  appStore: 'https://apps.apple.com/...',
  github: 'https://github.com/...'
};
```

只允許完整的 `https://` 網址。未填入時，按鈕會開啟「尚未設定」提示，不會跳到其他不明網站。

## 本地開啟與部署

網站包含：

```
index.html
styles.css
pos-demo.css
app.js
assets/favicon.svg
```

不需要 Node.js、不需要資料庫、不需要 CDN 或第三方 JavaScript。

在網站資料夾執行：

```sh
python3 -m http.server 8080
```

然後在瀏覽器開啟 `http://localhost:8080`。部署至 Nginx 時，將以上檔案放入站點的 `root` 路徑即可。Cloudflare Pages 可直接上傳網站資料夾，build command 留空。

## 自訂

- **品牌色**：`styles.css` 頂端的 `--blue`、`--blue-strong`、`--orange`。
- **捲動故事文案**：`app.js` 的 `storySteps` 陣列。
- **故事內容和示範訂單**：`app.js` 的 `createDemo`、`setStoryScene`。
- **方案與價格**：`index.html` 的 `#pricing` 區塊。
- **下載連結**：`app.js` 的 `SITE_LINKS`。

## 使用說明及限制

1. 介面上的商品、收款、報表和接單均為模擬資料，不會觸發真實交易。
2. 網站的 App Store 和 GitHub 連結尚未提供，必須由管理者填寫。
3. 正式方案與價格不可直接從本展示頁認定為商業承諾。
4. 滑動故事使用原生 JavaScript、requestAnimationFrame、IntersectionObserver 和 CSS；不載入外部分析或追蹤 SDK。
5. 使用系統字體，Apple 裝置上會以系統 San Francisco 呈現，非 Apple 裝置則自動 fallback。
