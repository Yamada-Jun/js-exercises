//ES6のモジュールの外で実行が必要
const stats = require('./stats.js');

//インポートした関数とクラスを使用
stats.func_a(); // => "func_a"

const obj = new stats.class_a();
obj.func(); // => "class_a"