// ※非strictモードで実行すること

// ■すべての属性をtrueにしたプロパティ
let object0 = {};
Object.defineProperty(object0, "x0", {
    value: 0,
    writable: true,
    enumerable: true,
    configurable: true
});

// ◇変更
object0.x0 = 77;            // 変更可能
console.log(object0.x0);    // => 77

// ◇削除
delete object0.x0;          // 削除可能
console.log(object0.x0);    // => undefined

// 削除したので再定義
Object.defineProperty(object0, "x0", {
    value: 0,
    writable: true,
    enumerable: true,
    configurable: true
});

// ◇hasOwnProperty
console.log(object0.hasOwnProperty("x0")); // => true

// ◇propertyIsEnumerable
console.log(object0.propertyIsEnumerable("x0")); // => true


// ■writable 属性をfalseにしたプロパティ
let object1 = {};
Object.defineProperty(object1, "x1", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: true
});

// ◇変更
object1.x1 = 77;         // => strictモードではエラーになる
console.log(object1.x1); // => 1 書き込み不可のため、1のままとなる

// ◇削除
delete object1.x1;          // 削除可能
console.log(object1.x1); // => undefined

// 削除したので再定義
Object.defineProperty(object1, "x1", {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: true
});

// ◇hasOwnProperty
console.log(object1.hasOwnProperty("x1")); // => true

// ◇propertyIsEnumerable
console.log(object1.propertyIsEnumerable("x1")); // => true


// ■enumerable 属性をfalseにしたプロパティ
let object2 = {};
Object.defineProperty(object2, "x2", {
    value: 2,
    writable: true,
    enumerable: false,
    configurable: true
});

// ◇変更
object2.x2 = 77;         // => 変更可能
console.log(object2.x2); // => 77

// ◇削除
delete object2.x2;          // 削除可能
console.log(object2.x2); // => undefined

// 削除したので再定義
Object.defineProperty(object2, "x2", {
    value: 2,
    writable: true,
    enumerable: false,
    configurable: true
});

// ◇hasOwnProperty
console.log(object2.hasOwnProperty("x2")); // => true

// ◇propertyIsEnumerable
console.log(object2.propertyIsEnumerable("x2")); // => false enumerableがfalseのため



// ■configurable 属性falseにしたプロパティ
let object3 = {};
Object.defineProperty(object3, "x3", {
    value: 3,
    writable: true,
    enumerable: true,
    configurable: false
});

// ◇変更
object3.x3 = 77;         // => 変更可能
console.log(object3.x3); // => 77

// ◇削除
delete object3.x3;          // 再定義不可の場合は削除できない
console.log(object3.x3); // => 77

// ◇hasOwnProperty
console.log(object3.hasOwnProperty("x3")); // => true

// ◇propertyIsEnumerable
console.log(object3.propertyIsEnumerable("x3")); // => true

