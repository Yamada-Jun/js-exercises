export const f1 = (n, c) => {    // 引数が複数ある場合は丸括弧の中にカンマで区切ってパラメータを記述する必要がある
    // 文字cをn回コンソール出力
    for (let i = 0; i < n; i++) {
        console.log(c);
    }

    const result = [];
    // 文字cをn個含む配列を作成
    for (let i = 0; i < n; i++) {
        result.push(c.toString())
    }
    return result;
}

export const f2 = x => x ** 2; //引数が1つなら丸括弧を省略可能。関数本体がreturn文だけの場合はreturnを省略可能

export const f3 = () => ({ now: new Date()}) //引数がない場合は丸括弧が必要。戻り値がオブジェクトの場合は丸括弧の中に記述する