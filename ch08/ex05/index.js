export const sequenceToObject = (...values) => {
    const result = {};
    // 引数がない場合は例外を発生
    if (values.length === 0) {
        throw new Error();
    }
    // 引数の配列の数が偶数でない場合は例外を発生
    if ((values.length % 2) !== 0) {
        throw new Error();
    }
    for (let i = 0; i < values.length; i = i + 2) {
        // 文字列でない場合は例外を発生
        if (typeof values[i] !== "string") {
            throw new Error();
        }
        //ブラケット記法でプロパティを追加
        result[values[i]] = values[i + 1];
    }
    return result;
}

//console.log(sequenceToObject("a", 1, "b", 2));