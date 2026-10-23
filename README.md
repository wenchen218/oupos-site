# OUPOS 官方形象網站 — Apple 式捲動展示版

這是一個**可直接部署的靜態網站**。使用 `DESIGN-apple.md` 描述的產品展示排版語彙，但保留 OUPOS 原有的品牌色（`#8EAFCA`、`#7E9FBC`、`#FF8A45`）。網站並非 Apple 官方網站，也不使用 Apple 商標或未授權的網頁素材。

## 網站內容

- 大字產品首頁，完整 iPad POS 介面示意
- 六個隨捲動變化的操作場景：選商品、加入購物車、調整配料、現金結帳、線上訂單、營運報表
- 捲動時進場的功能區塊；提供「上一個 / 下一個」按鈕，尊重減少動態效果系統設定
- 可實際點擊的示範 POS：點餐、付款、線上訂單、報表、掃碼、設定
- 三個方案卡片與完整比較表：開源免費版、進階多工版、線上專業版（以這次上傳的首頁為準）
- FAQ、App Store 和 GitHub 入口
- 電腦、平板、手機適應式排版

## 價格與服務聲明

這次上傳的自訂首頁已將三種方案改為「開源免費版：NT$0」、「進階多工版：NT$299/月」、「線上專業版：NT$499/月」，本次保留這些修改。但同一頁仍含「尚未正式推出／價格未確認」等舊說明，`app.js` 中也保留規劃階段的對話提示；**是否正式提供付費方案，須由營運者自行確認**，在公開發行前請將首頁、FAQ、按鈕對話與正式服務契約的描述調整一致。本次未自行變更任何方案名稱、價格或功能。

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


## 新增：隱私權政策與服務條款

本版本依據你上傳的 `index.html`、`styles.css`、`pos-demo.css`、`app(1).js` 修改，打包時將 `app(1).js` 更名為 `app.js`，以符合 HTML 原本的載入路徑。新增：

- `privacy.html`：隱私權政策草案，涵蓋網站展示、POS 資料、第三方服務、資料保存與當事人權利。
- `terms.html`：服務條款草案，涵蓋免費開源、網站示範、付費服務、使用責任及變更。
- `legal.css`：兩個法律頁面的響應式排版。
- 官網頁尾：新增「隱私權政策」「服務條款」連結。

**發布前必要事項（不可忽略）**

1. 在 `privacy.html`、`terms.html` 中搜尋所有 `【...】` 佔位欄位，填入營運者法定名稱、真實聯絡信箱、資料使用／保留期限、地區、第三方供應商、授權資訊等。
2. 核實正式 POS App 是否登入、採集手機／會員資料、使用相機／網路、連接付款或通知平台、將資料儲存於本機、商家伺服器或雲端；政策需與實際資料流、App Store Connect 隱私揭露一致。
3. 將兩頁頂部的「正式發布前請確認」提示在資訊補齊與法律審閱完成後，視需要改為正式發布用文案。這兩頁目前是**草案**，不能直接視為已核實的法律聲明。
4. 你提供的首頁目前標示「NT$299/月」「NT$499/月」，但同頁的方案說明仍稱「尚未推出」；這些文字是**按你原檔保留**，正式上線前應確認是否已開放訂購及價格條款是否一致。
5. 本次順便修復 `index.html` 中首頁 hero 多餘的關閉標籤，以及線上專業版功能列表過早結束的 `</ul>`，不更改你的商品文案、品牌色、捲動動畫或價格。

上線後公開網址為：`https://你的網域/privacy` 與 `https://你的網域/terms`。Apple App Store Connect 的 Privacy Policy URL 可填入前者，但需先核對正式 App 資料使用方式。

### 不顯示 `.html` 的網址設定

網站檔案**仍保留** `privacy.html`、`terms.html`（HTML 是網站檔案格式），但頁面上的所有公開連結都使用 `/privacy` 與 `/terms`，網址列不需要帶副檔名。

**Cloudflare Pages：** 可直接上傳整個網站資料夾，無須設定額外規則。Pages 會自動將 `privacy.html` 對應到 `/privacy`，並把帶 `.html` 的請求導向無副檔名網址。

**Nginx：** 請確認網站 `server` 中的靜態檔案 `location /` 使用：

```nginx
location / {
    try_files $uri $uri.html $uri/ =404;
}
```

若希望使用者直接輸入 `/privacy.html` 或 `/terms.html` 時也自動改成簡潔網址，可以在相同的 `server` 區塊額外加上：

```nginx
location = /privacy.html { return 301 /privacy; }
location = /terms.html { return 301 /terms; }
```

修改 Nginx 前請先備份設定，執行 `nginx -t` 確認通過後再 reload。若與現有的應用路由或反向代理設定衝突，應依既有架構整合，不能直接覆蓋整個 `server` 區塊。

**本機檢查：** 若使用 `python3 -m http.server`，該簡易伺服器不具備副檔名省略功能；本機可先使用 `/privacy.html`、`/terms.html` 預覽，部署到支援簡潔網址的環境才以 `/privacy`、`/terms` 對外提供。

參考法規與平台文件：
- 台灣《個人資料保護法》第 8 條：https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021
- Apple App privacy：https://developer.apple.com/help/app-store-connect/reference/app-information/app-privacy


## SwiftUI 對照更新（2026-10-19）

這個版本已參考使用者提供的 OUPOS Xcode 專案：`DesignSystem.swift`、`CommonViews.swift`、`OrderView.swift`、`CheckoutView.swift`、`OnlineOrdersView.swift`、`ReportsView.swift`、`POSModels.swift`，把品牌色、POS 顶部導覽、三欄比例、商品卡片 86pt 最小高度、選商品後的配料面板、購物車選取樣式、結帳的桌號與出單開關、現金與數量鍵盤、線上訂單卡片、報表分頁等元素調整得更接近原始 SwiftUI 介面。

注意：這是 **HTML/CSS/JS 重新實作的展示版**，不是 SwiftUI App 的逐像素截圖，也沒有連接 POS 真實 API、商家資料庫、付款、攝影機或印表機。商品、店名、金額、訂單均為獨立示意資料；不包含 Xcode 專案原始程式碼、憑證或私人伺服器設定。獨立法律頁 `/privacy`、`/terms` 與原本網站方案設定均保留。


### 網頁版結帳完成流程

選擇商品與配料 → 結帳 → 選支付方式與桌號 → 現金時輸入實收金額 → 下單 → 顯示「結帳完成」及訂單摘要 → 「下一筆訂單」清空本次購物車並重置付款狀態。此功能僅在瀏覽器記憶體中更新，不涉及任何金流或後端 API。使用者導向的操作畫面不另外放置說明提示。


## 模組報價表（簡潔版）

- 首頁 `index.html` 的 `#modules` 區段已改為 **六列靜態表格**，保留菜單匯入、出單設備、顧客顯示器、第三方串接、客製報表及其他開發需求；未定價項目標示「個別詢價」，不再使用勾選及複製需求清單。
- 報價頁 `pricing.html`（GitHub Pages 另有 `pricing/index.html`）的 `#modules` 區段已改為 **四列靜態表格**：全支付 NT$500／一次、LINE Pay NT$500／一次、Uber Eats NT$99／月、兩個金流模組合購 NT$800／一次。以上金額沿用原有網站資料，並未修改訂閱方案價格。
- 表格共用 `styles.css` 的 `.module-simple-table` 樣式；在手機上三欄會壓縮排版並換行，費用不會被隱藏；支援鍵盤聚焦。
- `app.js` 已移除原勾選／複製清單的不再使用程式碼；POS 展示及結帳互動保留。

## Apple App Store 審核用公開頁面（2026-10-22）

這一版使用你提供的 `oupos-site-main.zip` 為基礎。原有首頁、報價、模組詢價、FAQ、互動 POS、圖片及樣式均保留。

- `oupos-privacy.html` → Cloudflare Pages：`https://oupos.app/oupos-privacy`
- `oupos-support.html` → Cloudflare Pages：`https://oupos.app/oupos-support`
- `app-review.css` → 兩個頁面的響應式樣式，配色對齊 OUPOS 品牌。
- 原有 `privacy.html` 是較早期的**網站服務草案**（內含待核實欄位），不應填入 App Store Connect。首頁已改為導向 App 專屬的 `oupos-privacy`。
- 主網站的 `terms.html` 仍保留，以免覆蓋已有的服務條款頁。
- 新增頁面使用開發者名稱 `Lichueh Weng`、客服信箱 `support@oupos.app`、日期 `2026-10-22`、Bundle ID `app.oupos`。
- 以使用者此次提供的「App 本機儲存、無雲端帳號登入、Keychain、區網 TCP 列印、外部 AI JSON 匯入及手動備份」為準；**這個 App 專屬的聲明，不代表官網示範中的其他方案或服務具有相同資料處理方式**。

### 部署方式

**Cloudflare Pages**：將此網站資料夾內容（`index.html` 必須在上傳根層）直接上傳；Pages 會將 `oupos-privacy.html` 對應至 `/oupos-privacy`，`oupos-support.html` 對應至 `/oupos-support`。

**GitHub Pages**：使用另附的 `OUPOS-官網-GitHub-Pages版.zip`。GitHub Pages 標準靜態託管採資料夾式路由，正式頁面會以 `/oupos-privacy/` 和 `/oupos-support/` 形式提供，沒有 `.html`，但有結尾斜線。此版本也將既有的報價、FAQ、服務條款等根相對 URL 改為相對網址，以適應專案子路徑。

網址及 App Store Connect 的填寫請以**部署後公開可以正常瀏覽的實際 URL**為準。本檔案僅是靜態網站，並不保證審核通過；請再次核對 App 真正的資料處理行為和 App Store Connect 隱私權申報一致。
