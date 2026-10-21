# OUPOS — Google Cloud Console OAuth 驗證前核對事項（內部文件；不要當作公開隱私權政策）

本次 `privacy.html` 已重寫成以 OUPOS 為品牌、對 Google 登入及一般 POS/會員/點餐用途分別揭露的版本；不再留 `【請填入】` 佔位文字。但仍有**必須跟實際正式系統比對**的資料，否則政策即使很長仍可能被 Google 拒絕，或因不實揭露而有風險。

## 尚未取得驗證證據

1. **真正的 OAuth Scopes**：請開啟 Google Cloud Console → Google Auth Platform → Data Access，提供實際列出的 scopes。頁面目前介紹 `openid / email / profile` 類型的基本 Google 登入。若有 Gmail、Drive、Calendar 或其他 API，必須逐項補充實際資料與用途，不能直接沿用本稿。
2. **正式 App 身分**：確認 Google Cloud 專案的 App name 是否為 OUPOS，Google 登入究竟由 OUPOS 本體、線上點餐子系統，還是另一個子網域提供。若 Google OAuth 專案其實對應獨立網站／產品，應確認「首頁／隱私政策與實際使用功能」相符。
3. **登入與後端儲存**：核對 Google user ID、email、name、avatar URL 實際有無存入資料庫、是否儲存 OAuth access/refresh token、登入服務商（例：如果真的使用 Supabase，才可明確標示 Supabase）、資料儲存國家或區域。
4. **資料保存期限**：核對帳戶刪除的技術流程、Session/日誌保留天數、訂單資料保留的法令依據，確保政策與實際刪除流程相符。
5. **第三方資料分享**：確認 Cloudflare 是否使用在此網站；付款/外送/訊息功能是否對 Google 基本個資有任何轉傳；如果有，請逐項揭露資料與用途。
6. **真實營運主體**：政策目前列 OUPOS 品牌和可聯絡客服 email，但未獲提供營運者法定名稱。若 Google 要求責任人或公司名稱，需用實際依法登記的名稱，不能捏造 OUPOS 有限公司。
7. **已實作的權利流程**：確認 `support@oupos.app` 可以收信並確實處理刪除；Google 撤銷授權後，不應再存取被撤銷的 Google API 資料。
8. **公開站點與登入內告知**：Google OAuth consent screen 的首頁 `https://oupos.app/` 與政策 `https://oupos.app/privacy` 要與網站頁尾所連一致；網址必須不用登入即可開啟；登入入口附近也要能開啟政策。
9. **授權網域擁有權**：Google Search Console 驗證專案相關 `oupos.app` 及使用中的 OAuth authorized domains；在 Google Auth Platform → Branding / Audience / Data Access 中檢查名稱、聯絡方式、權限和網域。
10. **OAuth 驗證測試**：如要求影片，應展示實際 App、完整 Google 授權畫面、授權 scopes 及實際功能；敏感／受限 scopes 會有額外要求。

## 部署

* 若透過 GitHub 已部署整個網站：替換 `privacy.html` 即可（本版也改了 `legal.css` 的 `?v=` 引用，以避免法律頁樣式舊快取，CSS 檔本身未變動）。
* Cloudflare Pages Direct Upload：建議上傳 ZIP 解壓縮後的整個 `OUPOS-website` 內容。
* 在瀏覽器、無痕模式與手機檢查 `https://oupos.app/privacy` 是否回傳 `200` 且公開可讀，並確認不是被 Cloudflare Access、登入限制或 robots 擋住。
* Google Cloud Console → Google Auth Platform → Branding → Privacy policy URI：設定**精確** `https://oupos.app/privacy`，完成部署後再重新申請驗證。

## 官方規範（2026-10-21 查閱）

* Verification requirements: https://support.google.com/cloud/answer/13464321
* Google API Services User Data Policy: https://developers.google.com/terms/api-services-user-data-policy
* Google OAuth 2.0 Policies: https://developers.google.com/identity/protocols/oauth2/policies

**注意**：此版本是可編輯、可部署之隱私揭露初稿；是否符合審查，取決於以上事實與實際 App 行為完全一致。未證實 OAuth scopes 前，不能保證通過 Google 驗證。
