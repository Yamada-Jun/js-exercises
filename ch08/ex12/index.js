
export function f(s) {
    return function (...args) {
        // 関数本体を決定する。sに「{」が含まれていればそのまま、なければreturn文として扱う
        let func_body;
        if (s.includes("{")) {
            // そのまま関数本体として扱う
            func_body = s;
        } else {
            // return文として扱う
            func_body = `return ${s};`;
        }

        // 引数名を$1, $2, ...の形式で作成する
        let func_args = [];
        for (let i = 0; i < args.length; i++) {
            //$1, $2, ...の形式で引数名を作成
            func_args.push(`$${i + 1}`);
        }
        // 引数名をカンマ区切りの文字列に変換する
        func_args = func_args.join(", ");

        // 新しい関数を生成する
        const func = new Function(func_args, func_body);

        // 生成した関数を呼び出して結果を返す
        return func(...args);
    };
}

// 例
//const arr = [5, 3, 8, 1];

//console.log(arr.reduce((a, b) => a + b, 0));
//console.log(arr.sort((a, b) => a - b));


//console.log(arr.reduce(f("$1 + $2"), 0));
//console.log(arr.sort(f("$1 - $2")));

