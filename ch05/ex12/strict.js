//strict���[�h�ł�with�͎g���Ȃ�
let obj = { a: 1, b: 2 };
with (obj) {    //SyntaxError: Strict mode code may not include a with statement
    console.log(a);
}

//strict���[�h�ł͕ϐ��͐錾���Ȃ���΂Ȃ�Ȃ�
c = 3;
console.log(c); // ReferenceError: c is not defined

//strict���[�h�ł͊֐��Ƃ��ČĂяo���ꂽ�֐����ɂ�����this��undefined�ɂȂ�
function f() {
    console.log(this.a); // TypeError: Cannot read properties of undefined (reading 'a')
}
f();