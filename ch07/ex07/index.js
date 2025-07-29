


//const seq = [5, 2, 3, 4, 5];

export function sort(
    array,
    compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
    // 選択ソートの実装
    for (let i = 0; i < array.length - 1; i++) {
        // 最小値のインデックスを探す
        let min = i;
        for (let j = i + 1; j < array.length; j++) {
            if (compare(array[j], array[min]) < 0) {
                min = j;
            }
        }
        // 最小値と現在の位置の要素を交換
        if (min !== i) {
            [array[i], array[min]] = [array[min], array[i]];
        }
    }
    return array;
}

//console.log(sort(seq)); // [2, 3, 4, 5, 5]