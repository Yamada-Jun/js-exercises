export function template(strings, ...values) {
    // strings: テンプレートリテラルの文字列部分の配列,$で区切った$以外の部分が順番に入っている
    // values: テンプレートリテラルの埋め込み式の値の配列,$の部分が順番に入っている
    let result = '';
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        // 値が存在する場合は、その型を追加
        // values配列の長さはstrings配列の長さより1つ少ないため、i < values.lengthを条件とする
        if (i < values.length) {
            result += typeof values[i];
        }
    }
    return result;
}

//console.log(template``); // ""
//console.log(template`test`); // "test"
//console.log(template`Hello, ${"A"}`); // "Hello, string"
//console.log(template`${1} ${null} ${() => { }}`); // "number object function"
//console.log(template`type of 'A' is ${"A"}`); // "type of 'A' is string"
//console.log(template`type of '10n**100n' is ${10n ** 100n}`); // type of '10n**100n' is bigint
//console.log(template`type of 'false' is ${false}`); // type of 'false' is boolean
//console.log(template`type of 'Symbol' is ${Symbol()}`); // type of 'Symbol' is symbol
