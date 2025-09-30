//ES6のモジュールのインポート
import stats, { class_b } from './stats.js';

//インポートした関数とクラスを使用
stats(); // => "func_a"

const obj = new class_b();
obj.func(); // => "class_a"

//まとめて再エクスポート
export * from './stats.js';         //この形式では名前付きエクスポートのみ再エクスポートされる
export { default } from './stats.js';   //デフォルトエクスポートを再エクスポートする