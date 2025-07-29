// P149 冒頭のコード
let o = {};
o.x = 1;
let p = Object.create(o);
p.y = 2;
let q = Object.create(p);
q.z = 3;


// o が p および q のプロトタイプチェーン上に存在することをObject.prototype.isPrototypeOf() で確認
console.log(o.isPrototypeOf(p)); // => true
console.log(o.isPrototypeOf(q)); // => true


// Object, Array, Date, Map のプロトタイプチェーンの継承関係を確認するためのコード
console.log(Object.prototype.isPrototypeOf(Array));     // => true
console.log(Object.prototype.isPrototypeOf(Date));      // => true
console.log(Object.prototype.isPrototypeOf(Map));       // => true
