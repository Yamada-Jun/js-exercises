import { f } from "./index.js";

let proto = {
    // プロパティ名が数値のプロパティ を持つオブジェクトをプロトタイプとして持つ
    1: 2,
    // プロパティ名が文字列のプロパティ を持つオブジェクトをプロトタイプとして持つ
    "string": 3,
};

// 列挙不可能なプロパティを追加
Object.defineProperty(proto, "enum", {
    value: 0,
    enumerable: false
});

// 列挙不可能なプロパティ を持つオブジェクトをプロトタイプとして持つ
let object = Object.create(proto);

// 独自プロパティを追加
object.x = 4;

// 独自プロパティで列挙不可のプロパティを追加
Object.defineProperty(object, "y", {
    value: 5,
    enumerable: false
});


//             独自プロパティ  継承プロパティ
// 列挙可      〇 x            〇 1,  string
//
// 列挙不可    〇 y            × enum

// 〇のプロパティのみ出力される関数であること

test("ch06-ex06", () => {
    expect(f(object)).toStrictEqual(['x', 'y', '1', 'string']);
});
