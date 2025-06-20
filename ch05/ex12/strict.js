//strictモードではwithは使えない
let obj = { a: 1, b: 2 };
with (obj) {    //SyntaxError: Strict mode code may not include a with statement
    console.log(a);
}

//strictモードでは変数は宣言しなければならない
c = 3;
console.log(c); // ReferenceError: c is not defined

//strictモードでは関数として呼び出された関数中においてthisはundefinedになる
function f() {
    console.log(this.a); // TypeError: Cannot read properties of undefined (reading 'a')
}
f();