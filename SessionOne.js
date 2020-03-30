var a = 1;

console.log("使用 `node fileName.js` 在 CMD 執行 JS 檔案。");

a = 2;

console.log(
  "點擊左側下 Break Point，程式會在該行停止，並且使用 Debug 模式來看到變數等值。"
);

console.log("Node 的 global 跟 Browser 的 window 一樣。");
console.log(global);

var a = 1;
console.log(global);

console.log(
  "Node 與 Browser 不一樣在於，var 提昇到全域後不會自動掛載在 window/global 下，必須用物件下的 key 的方式掛載"
);
console.log("var 的全域限定為該 js檔案/module 內");
global.a = 2;
console.log(global);

console.log("END");

var data = 1;
console.log(global); // 此時找不到
