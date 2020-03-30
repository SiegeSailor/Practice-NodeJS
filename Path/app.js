var path = require("path");

// 取目標檔案的目錄路徑
console.log(path.dirname("/upper/lower/bottom.js"));

// 路徑合併
console.log(path.join(__dirname, "/extra"));
console.log(path.join("/1", "/2"));

// 取目標檔案檔名
console.log(path.basename("/upper/lower/bottom.js"));

// 取目標副檔名
console.log(path.extname("/upper/lower/bottom.js"));

// 分析檔案，同時取出目錄路徑、檔名等資訊
console.log(path.parse("/upper/lower/bottom.js"));
