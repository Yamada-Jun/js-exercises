//const seq = [1, 2, 3, 4, 5];

export function pop(array) {
    //配列のコピー
    let copy;
    if (Array.isArray(array)) {
        // スプレッド演算子を使用して配列のコピーを作成
        copy = [...array];
    }
    copy.pop();
    return copy;
}

export function push(array, num) {
    //配列のコピー
    let copy;
    if (Array.isArray(array)) {
        // スプレッド演算子を使用して配列のコピーを作成
        copy = [...array];
    }
    copy.push(num);
    return copy;
}

export function shift(array) {
    //配列のコピー
    let copy;
    if (Array.isArray(array)) {
        // スプレッド演算子を使用して配列のコピーを作成
        copy = [...array];
    }
    copy.shift();
    return copy;
}
export function unshift(array, num) {
    //配列のコピー
    let copy;
    if (Array.isArray(array)) {
        // スプレッド演算子を使用して配列のコピーを作成
        copy = [...array];
    }
    copy.unshift(num);
    return copy;
}
export function sort(array, predicate) {
    //配列のコピー
    let copy;
    if (Array.isArray(array)) {
        // スプレッド演算子を使用して配列のコピーを作成
        copy = [...array];
    }
    copy.sort(predicate);
    return copy;
}

//console.log(pop(seq)); // [1, 2, 3, 4]
//console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
//console.log(shift(seq)); // [2, 3, 4, 5]
//console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
//console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

//// 元の配列は変更されていない
//console.log(seq); // [1, 2, 3, 4, 5]
