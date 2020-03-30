var content = require("./ModuleExportValue");
var a = 1;
var datas = require("./ModuleExportObject");
var dataFromExports = require("./ModuleExports.js");

console.log("exports 和 module.exports 不能共用，下面會覆蓋上面的。");

console.log(a, content, datas, dataFromExports);
