const obj1 = { x: 1 };
// 問題: ここに1行コードを書くことで以下の行で {x: 1, y: 2} が出力されること
obj1.y = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// 問題: 以下の行では何が出力されるか、予想してから結果を確認しなさい
console.log(obj1 === obj2); //=> false

export function equals(o1, o2) {
    //o1 と o2 が 厳密に等価 である場合 true を返す。
    if (o1 === o2) {
        return true;
    }
    //o1 または o2 に null またはオブジェクト以外が指定された場合 false を返す (tyepof の返り値が object かどうかを確認しなさい)
    if ((o1 === null) || (o2 === null) || (typeof o1 !== "object") || (typeof o2 !== "object")) {
        return false;
    }
    //o1 と o2 のプロパティの数が一致しない場合は false を返す
    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }
    //o1 と o2 のプロパティの名前が一致しない場合は false を返す
    for (const prop in o1) {
        if (!(prop in o2)) return false;
    }
    //o1 と o2 のプロパティの各値を equals で比較し、全て true ならば true を返し、1つでも false があれば false を返す
    for (const prop in o1) {
        if (!equals(o1[prop], o2[prop])) return false;
    }
    return true;
}

// 厳密等価なら true
console.log(equals(42, 42)); // true
console.log(equals(null, null)); // true

// 厳密等価ではない場合オブジェクト以外が指定されれば false
console.log(equals({ x: 42 }, 42)); // false
console.log(equals(null, { x: 42 })); // false

// プロパティの数・名前が一致しなければ false
console.log(equals({ x: 1 }, { y: 1 })); // false
console.log(equals({ x: 1 }, { x: 1, y: 1 })); // false

// プロパティの各値を equals で再帰的に比較
console.log(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })); // true
console.log(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })); // false
