# OUPOS 官方網站 — SEO / GEO 與平板動態展示優化版

網站包含官方產品首頁、六段 iPad POS 滾動展示、三種公開方案、常見問題、隱私權政策與服務條款。整體採原生 HTML / CSS / JS，可直接部署 Cloudflare Pages 或 Nginx，沒有前端建置程序與額外執行時依賴。

## 網站結構

```
OUPOS-website/
├── index.html          # 官網、結構化資料、SEO metadata、FAQ
├── styles.css          # 品牌樣式與響應式設計
├── pos-demo.css        # iPad POS 示範介面
├── app.js              # 六階段捲動展示與操作畫面
├── legal.css           # 隱私與服務條款共用樣式
├── privacy.html        # /privacy
├── terms.html          # /terms
├── robots.txt          # 爬蟲規則與 Sitemap 位置
├── sitemap.xml         # 首頁、/privacy、/terms
├── llms.txt            # AI 可閱讀的產品與價格摘要（非通用標準）
├── assets/
│   ├── favicon.svg
│   └── og-oupos.png     # 1200×630 社群分享圖
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
- 隱私權政策 `https://oupos.app/privacy`
- 服務條款 `https://oupos.app/terms`
- Sitemap `https://oupos.app/sitemap.xml`
- robots `https://oupos.app/robots.txt`
- llms 資訊 `https://oupos.app/llms.txt`

如果正式網址不是 `https://oupos.app`，請搜尋替換專案中**所有**該網址（尤其是 canonical、OG、JSON-LD、sitemap、robots、llms）。同時設定網站主機將 www、pages.dev 等替代網址 301 重新導向至正式 canonical 網域，避免重複收錄。**本檔案無法代替你在 Cloudflare 的網域 DNS / Redirect Rules 設定。**

## SEO / GEO 實作

- 首頁與兩個法律頁的唯一標題、描述、canonical、Open Graph 與分享圖。
- 正確語言宣告 `zh-Hant`，首頁 `SoftwareApplication`、`WebSite`、`Organization`、`OfferCatalog` 和可見 FAQ 對應的 `FAQPage` JSON-LD；不虛構評論與評分。
- 三種方案、費用、功能和答案寫在**原始 HTML 內**，不依賴 JavaScript 載入才能被讀到。
- `robots.txt` 允許一般爬蟲，並提供 Sitemap URL。
- `sitemap.xml` 採 sitemap.org 格式，收錄三個可索引的公開頁面。
- `llms.txt` 供支援此格式的 AI 爬蟲參考；**它不是 Google 排名或 AI 引用保證**。

部署成功後建議執行：
1. 在瀏覽器確認上述每個 URL 都能正確開啟（不可回 404）。
2. 以 Google Search Console 驗證 `oupos.app` 網域資產，提交 `https://oupos.app/sitemap.xml`。
3. 使用 Google Rich Results Test / Schema Markup Validator 測試結構化資料，並用 URL Inspection 檢查可索引性。軟體應用程式富媒體搜尋結果可能要求真實評論／評分；本站未虛構評分。
4. 用 Facebook 分享偵錯工具等確認 OG 圖片是否可供公開讀取。
5. 定期更新內容、真正可用的下載連結，並保持網站資訊與實際方案一致。

## 已修復「每一步，都看得見」白畫面

六個場景於載入時一次建立 `#story-scene-0` 至 `#story-scene-5`。捲動時**只切換可見度，不再在切換動畫途中動態重建商品卡片、結帳頁或報表頁**。若 JavaScript 因網路中斷未載入，CSS 仍會保留第一個場景的空間背景；正常載入後會呈現全部六個畫面。

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

- **Cloudflare Pages**：解壓縮並上傳整個 `OUPOS-website/` 資料夾，網站入口檔為根目錄 `index.html`，Build command 留空。Cloudflare Pages 的 extensionless HTML 行為可提供 `/privacy`、`/terms`。
- **Nginx**：把檔案放入站點的 `root` 目錄，並在 `location /` 設定 `try_files $uri $uri.html $uri/ =404;` 以支援乾淨網址。部署前用 `nginx -t` 驗證設定，營業中應慎選重新載入的時機。

本地測試：

```sh
cd OUPOS-website
python3 -m http.server 8080
```

開啟 `http://localhost:8080`，注意 Python 內建靜態伺服器可能不自動將 `/privacy` 導向 `privacy.html`；需要在 Cloudflare Pages 或設定好路由的 Nginx 下測試乾淨網址。
