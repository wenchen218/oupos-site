# OUPOS 官方網站 — SEO / GEO 與平板動態展示優化版

網站包含官方產品首頁、六段 iPad POS 滾動展示、三種公開方案、獨立報價與 FAQ 頁面、官方聯絡方式、隱私權政策與服務條款。整體採原生 HTML / CSS / JS，可直接部署 Cloudflare Pages 或 Nginx，沒有前端建置程序與額外執行時依賴。

## 網站結構

```
OUPOS-website/
├── index.html          # 官網、結構化資料、SEO metadata、FAQ
├── styles.css          # 品牌樣式與響應式設計
├── pages.css           # FAQ、報價和聯絡區專屬樣式
├── pricing.html        # /pricing 獨立報價方案頁
├── faq.html            # /faq 獨立常見問題頁
├── pos-demo.css        # iPad POS 示範介面
├── app.js              # 六階段捲動展示與操作畫面
├── legal.css           # 隱私與服務條款共用樣式
├── privacy.html        # /privacy
├── terms.html          # /terms
├── robots.txt          # 爬蟲規則與 Sitemap 位置
├── sitemap.xml         # 5 個公開頁：首頁、/pricing、/faq、/privacy、/terms
├── llms.txt            # AI 可閱讀的產品與價格摘要（非通用標準）
├── assets/
│   ├── favicon.svg
│   ├── og-oupos.png     # 1200×630 社群分享圖
│   └── tour-01.webp ～ tour-06.webp  # 六段實際 POS 展示畫面
└── README.md
```

## 三種 OUPOS 版本（官網價格與功能）

| 功能與費用 | 免費版 | Plus | Pro |
|---|---:|---:|---:|
| 價格 | NT$0 | NT$259／月 | NT$599／月 |
| POS 結帳、庫存管理、員工帳號 | ✓ | ✓ | ✓ |
| 離線營運 | ✓ | —（需連網） | —（需連網） |
| 多機作業、多台出單機、手機報表 | — | ✓ | ✓ |
| 會員系統、線上點餐、桌邊 QR Code 點餐 | — | — | ✓ |
| 設備部署設定、操作教學、專屬客服 | — | ✓ | ✓ |
| 金流模組與 Uber Eats 串接加購 | — | ✓ | ✓ |

**加購模組（Plus／Pro 限定）**：全支付、LINE Pay 金流整合支援 POS 掃碼與線上付款，單個模組 NT$500（一次性），兩個合購 NT$800（一次性）。Uber Eats 串接模組 NT$99／月。第三方金流／外送平台自行收取的費用另計。

上述資料已同步到首頁、比較表、FAQ、`llms.txt`、`terms.html` 以及 `index.html` 的 JSON-LD。日後調整價格／功能時，記得同步修改這些位置。

## 使用正式網址 `https://oupos.app/`

網站目前使用下列正規網址：
- 官網 `https://oupos.app/`
- 報價方案 `https://oupos.app/pricing`
- FAQ `https://oupos.app/faq`
- 聯絡 Email `support@oupos.app`；LINE 官方帳號 `@183fjvbn`（`https://line.me/R/ti/p/%40183fjvbn`）
- 隱私權政策 `https://oupos.app/privacy`
- 服務條款 `https://oupos.app/terms`
- Sitemap `https://oupos.app/sitemap.xml`
- robots `https://oupos.app/robots.txt`
- llms 資訊 `https://oupos.app/llms.txt`

如果正式網址不是 `https://oupos.app`，請搜尋替換專案中**所有**該網址（尤其是 canonical、OG、JSON-LD、sitemap、robots、llms）。同時設定網站主機將 www、pages.dev 等替代網址 301 重新導向至正式 canonical 網域，避免重複收錄。**本檔案無法代替你在 Cloudflare 的網域 DNS / Redirect Rules 設定。**

## SEO / GEO 實作

- 首頁、報價頁、FAQ 與兩個法律頁的唯一標題、描述、canonical、Open Graph 與分享圖。
- 正確語言宣告 `zh-Hant`，首頁 `SoftwareApplication`、`WebSite`、`Organization`、`OfferCatalog` 和可見 FAQ 對應的 `FAQPage` JSON-LD；不虛構評論與評分。
- 三種方案、費用、功能和答案寫在**原始 HTML 內**，不依賴 JavaScript 載入才能被讀到。
- `robots.txt` 允許一般爬蟲，並提供 Sitemap URL。
- `sitemap.xml` 採 sitemap.org 格式，收錄五個可索引的公開頁面。
- `llms.txt` 供支援此格式的 AI 爬蟲參考；**它不是 Google 排名或 AI 引用保證**。

部署成功後建議執行：
1. 在瀏覽器確認上述每個 URL 都能正確開啟（不可回 404）。
2. 以 Google Search Console 驗證 `oupos.app` 網域資產，提交 `https://oupos.app/sitemap.xml`。
3. 使用 Google Rich Results Test / Schema Markup Validator 測試結構化資料，並用 URL Inspection 檢查可索引性。軟體應用程式富媒體搜尋結果可能要求真實評論／評分；本站未虛構評分。
4. 用 Facebook 分享偵錯工具等確認 OG 圖片是否可供公開讀取。
5. 定期更新內容、真正可用的下載連結，並保持網站資訊與實際方案一致。

## 已修復「每一步，都看得見」白畫面

改成六張預先匯出的 OUPOS POS 操作畫面 WebP，捲動時只更新**單一圖片元素**，不再同時維護六個巨大 DOM 畫面，也不重建結帳或報表元件。`fitStory()` 為 iPhone Safari 明確設定螢幕區高度（寬度 × 570/1040），防止平板內容坍縮成一條黑色邊框。即使 JavaScript 未載入也會顯示第 01 張展示圖片；正常載入後會依序呈現全部六個畫面。

現場交易功能**只由真正的 iPad POS App 處理**；官網展示所使用的資料與 POS 操作不會連線到你的正式付款或訂單 API。

## 下載連結

`app.js` 頂端的 `SITE_LINKS` 尚需填入你自己的真實網址：

```js
const SITE_LINKS = {
  appStore: 'https://apps.apple.com/...',
  github: 'https://github.com/...'
};
```

如果尚未設定這兩個連結，首頁按鈕會顯示提示對話框，而不是導向錯誤位置。**正式營運網站應在上線前設定可用的取得、訂閱或客服入口。** Plus 與 Pro 按鈕目前連到首頁取得區，並未自行創造假的付款入口。

## 隱私與法律文件

`privacy.html` 與 `terms.html` 是現有提供的文件內容；其中仍有要以你的真實資訊填寫／核實的項目，例如**營運者法定名稱、個資聯絡 Email、保存期限、第三方服務與實際付款／取消方式**。這些內容請勿直接留白公開營運。這次同步更新服務條款的版本價格、服務內容及加購模組費用，但不是法律合規審查。

## 部署方式

- **Cloudflare Pages**：解壓縮並上傳整個 `OUPOS-website/` 資料夾，網站入口檔為根目錄 `index.html`，Build command 留空。Cloudflare Pages 的 extensionless HTML 行為可提供 `/pricing`、`/faq`、`/privacy`、`/terms`。
- **Nginx**：把檔案放入站點的 `root` 目錄，並在 `location /` 設定 `try_files $uri $uri.html $uri/ =404;` 以支援乾淨網址。部署前用 `nginx -t` 驗證設定，營業中應慎選重新載入的時機。

本地測試：

```sh
cd OUPOS-website
python3 -m http.server 8080
```

開啟 `http://localhost:8080`，注意 Python 內建靜態伺服器可能不自動將 `/privacy` 導向 `privacy.html`；需要在 Cloudflare Pages 或設定好路由的 Nginx 下測試乾淨網址。


## 捲動展示（iPhone Safari 相容版）

`assets/tour-01.webp` 至 `tour-06.webp` 為由 OUPOS POS 示範 UI 直接產生的展示圖片。
網站會依六段捲動位置切換同一個 `#story-image` 的圖片；`fitStory()` 額外設定
畫面高度，以避免某些 iOS Safari 版本將平板內容壓扁。
若未來更改 POS 介面，請同步更新這六張圖片，並維持 1040×570 長寬比。

模組加購卡片直接沿用 `.plan-card` 結構，與免費、Plus、Pro 方案一致。


## 2026-10-21 手機捲動平板修復

- 六張 `assets/tour-01.webp`～`tour-06.webp` 現在固定放於橫向平板容器，透過 CSS 顯示／隱藏，不修改 `img.src`。
- 使用經典百分比 padding（570 ÷ 1040 = 54.80769%）鎖定橫向畫面比例，避免 iPhone Safari 將圖片繪製成原始 1040px 寬、570px 高。
- 手機版重新分配平板、文字與控制按鈕的高度；不再以 JavaScript 強制設定平板高度。
- 首頁 CSS、JS、展示圖帶有 `?v=20261021b` 版本參數，以防舊快取造成 JavaScript 與 CSS 混用。部署 Cloudflare Pages 後建議清除快取並重新整理手機頁面。


## 2026-10-21 獨立報價／FAQ 與官方聯絡管道

- 新增 `/pricing`、`/faq` 兩個獨立可索引的靜態頁面，並同步更新 `sitemap.xml`、`llms.txt`、Canonical、Open Graph 與 JSON-LD。
- 首頁保持使用者指定的 Title `OUPOS｜POS系統`；新頁面分別為 `OUPOS 報價方案｜免費版、Plus、Pro` 和 `OUPOS 常見問題 FAQ｜功能、價格與客服`。
- 首頁與獨立頁面新增聯絡區；全站頁尾及法律頁面新增真實客服電子郵件 `support@oupos.app` 和 LINE 官方帳號 `@183fjvbn`。
- LINE 官方帳號連結採 LINE Developers 官方的好友頁 URL 格式 `https://line.me/R/ti/p/%40183fjvbn`。請上線前以實際 LINE App 確認所提供 ID 是否正確。
- 隱私條款仍包含若干必須由營運者核實的法定名稱、資料保存時間與外部服務細節占位項。僅替換已收到的真實聯絡信箱，沒有捏造營運者姓名。
- 本更新**不影響原本的六階段 iPhone POS 操作展示程式**。
