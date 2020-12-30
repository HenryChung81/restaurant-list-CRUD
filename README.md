# 餐廳清單
這是一個使用 Node.js + Express 打造的餐廳網站，此網站將提供餐廳資訊及圖片讓你參考，同時可以透過搜尋關鍵字的方式找到符合你的餐廳。


## Features 產品功能
- 列出所有餐廳清單
- 可透過搜尋列輸入餐廳名稱，找出相關餐廳
- 點擊餐廳圖片，顯示餐廳詳細資訊　ex:電話、地址、型態
- 點擊icon可新增餐廳
- 點擊icon可修改餐廳資訊
- 可刪除餐廳

## Install 安裝與執行步驟
### 以下指令請在終端機操作
1. Clone此專案至本機
```
git clone https://github.com/HenryChung81/restaurant-list-CRUD.git
```
2. 進入存放專案的資料夾
```
cd restaurant_list_CRUD
```
3. 安裝npm套件
```
npm install 
```
4. 新增種子資料
```
npm run seed
```
5. 啟動伺服器，執行app.js
```
npm run start
```
6. 此時終端機出現以下字樣表示伺服器與資料庫已啟動並成功連結
```
Express is listening on http://localhost:3000
mongodb connected!
```
7. 在瀏覽器輸入http://localhost:3000 即可開啟專案
