//strictモードではwithは使えない
let obj = { a: 1, b: 2 };
//with (obj) {
    console.log(obj.a); // 1
//}

//strictモードでは変数は宣言しなければならない
let c = 3;
console.log(c); // 3

//strictモードでは関数として呼び出された関数中においてthisはundefinedになる
function f() {
    console.log(this?.a); // undefined
}
f();