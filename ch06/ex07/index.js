
// Object.assign()と等価な関数 assign2() を作成しなさい。与えられたテストindex.test.jsを全てパスすること。
export function assign(target, ...sources) {
    // test case 11: undefinedやnullを引数に渡した場合の対応
    if (target === null || target === undefined) {
        throw new TypeError("Cannot convert undefined or null to object");
    }

    // test case 5: プロパティを持てないプリミティブ型の場合の対応
    const result = Object(target);

    for (const source of sources) {
        // test case 4: nullまたはundefinedだった場合の対応
        if (source !== null && source !== undefined) {
            for (const key of Object.keys(source)) {
                result[key] = source[key];
            }
            // シンボルの対応
            for (const sym of Object.getOwnPropertySymbols(source)) {
                // test case 12: 列挙不可のシンボルをコピーしない対応
                if (Object.getOwnPropertyDescriptor(source, sym).enumerable) {
                    result[sym] = source[sym];
                }
            }
        }
    }

    return result;
}


//console.log(assign(1, 1, [{ foo: "foo", bar: "bar" }])); // { foo: "foo", bar: "bar" }
//console.log(Object.assign(1, 1, [{ foo: "foo", bar: "bar" }])); // { foo: "foo", bar: "bar" }

//const sym1 = Symbol("sym1");
//const sym2 = Symbol("sym2");
//const objWithSymbolProps = {
//    [sym1]: "symbol1",
//};
//Object.defineProperty(objWithSymbolProps, sym2, {
//    enumerable: false,
//    value: "symbol2",
//});
//console.log(assign({ foo: "foo" }, { foo: "foo" }, [objWithSymbolProps]));