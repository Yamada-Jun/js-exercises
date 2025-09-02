
export function any(...functions) {
    return function (value) {
        for (const _function of functions) {
            // �����ꂩ�̊֐���true��Ԃ�����true��Ԃ�
            if (_function (value)) {
                return true;
            }
        }
        return false;
    };
}

//const isNonZero = any(
//    (n) => n > 0,
//    (n) => n < 0
//);

//console.log(isNonZero(0)); // => false
//console.log(isNonZero(42)); // => true
//console.log(isNonZero(-0.5)); // => true




export function catching(func, handler) {
    return function (...args) {
        try {
            return func(...args);   //����ɓ��삵���ꍇ�͂��̌��ʂ�Ԃ�
        } catch (e) {
            return handler(e);      //��O�����������ꍇ��handler�֐����Ăяo���A���̌��ʂ�Ԃ�
        }
    };
}

//const safeJsonParse = catching(JSON.parse, (e) => {
//    return { error: e.toString() };
//});

//console.log(safeJsonParse('{"a": 1}')); // => {a: 1}
//console.log(safeJsonParse("{Invalid Json}")); // => {error: "SyntaxError: ..."}