//strict���[�h�ł�with�͎g���Ȃ�
let obj = { a: 1, b: 2 };
with (obj) {
    console.log(a); // 1
}

//strict���[�h�ł͕ϐ��͐錾���Ȃ���΂Ȃ�Ȃ�
c = 3;
console.log(c); // 3

//strict���[�h�ł͊֐��Ƃ��ČĂяo���ꂽ�֐����ɂ�����this��undefined�ɂȂ�
function f() {
    console.log(this.a); // 1
}
f();