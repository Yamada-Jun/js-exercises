//ES6のモジュールのインポート
import stats, { class_aa } from './re_export.js';

//インポートした関数とクラスを使用
stats(); // => "func_a"

const obj = new class_aa();
obj.func(); // => "class_a"
