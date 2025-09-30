//ES6のモジュールのインポート
import stats, { class_b } from './re_export.js';

//インポートした関数とクラスを使用
stats(); // => "func_a"

const obj = new class_b();
obj.func(); // => "class_a"
