export function sum(data) {
    if (data === null || data === undefined) return 0;
    return data.reduce((x, y) => x + y, 0);
}

export function join(data, separator) {
    // dataがundefinedの場合はTypeErrorを投げる
    if (data === undefined) {
        throw new TypeError();
    }
    // separatorがundefinedの場合はデフォルトで","を使用
    if (separator === undefined) {
        separator = ",";
    }
    else {
        separator = String(separator);  //最後にseparatorを削除するために文字列に変換
    }
    // 配列の要素がnullの場合は空文字列に変換し、その他の要素は文字列に変換して結合する
    let result = data.reduce((x, y) => x + (y === null ? "" : String(y)) + separator, "");
    // 最後のseparatorを削除,separator.lengthが0の場合にslice()を呼び出すと""になってしまうので、lengthが0でない場合のみslice()を呼び出す
    if (separator.length !== 0) {
        // 最後のseparatorが不要なので削除
        result = result.slice(0, -separator.length);
    }
    return result;
}

export function reverse(data) {
    // dataがundefinedの場合はTypeErrorを投げる
    if (data === undefined) {
        throw new TypeError();
    }
    // 配列の要素をスプレッド演算子を利用して逆順にして返す
    return data.reduce((x, y) => [y, ...x], []);
}


//console.log(join(["Hello", 2, 3], ""));

//console.log(join());


// every() は、配列のすべての要素が特定の条件を満たしているかどうかをチェックするためのメソッド
export function every(data, predicate) {
    // dataがundefinedの場合はTypeErrorを投げる
    if (data === undefined) {
        throw new TypeError();
    }
    // 配列の要素がすべてpredicateを満たすかどうかを判定する
    return data.reduce((x, y, index, arr) => x && predicate(y, index, arr), true);
}

//const original = [1, 2, 3]; // => [1, 1, 2] になる
//// 現在の要素の次の要素が存在すれば、その値を1減らす処理
//every(original, (elem, index, arr) => {
//    if (arr.length > index + 1) {
//        arr[index + 1]--;
//    }
//    return elem < 3;
//})
export function some(data, predicate) {
    // dataがundefinedの場合はTypeErrorを投げる
    if (data === undefined) {
        throw new TypeError();
    }
    // 配列の要素のいずれかがpredicateを満たすかどうかを判定する
    return data.reduce((x, y, index, arr) => x || predicate(y, index, arr), false);
}
