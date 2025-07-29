

//const x = [
//    [1, 2, 3],
//    [4, 5, 6],
//    [7, 8, 9]
//];
//const y = [
//    [7, 8, 9],
//    [10, 11, 12],
//    [13, 14, 15]
//];

export function add(x, y) {
    // xとyが2次元配列であることを確認
    if (x.length === y.length && x[0].length === y[0].length) {
        return x.map((row, i) => row.map((value, j) => value + y[i][j]));
    }
    return undefined; // サイズが異なる場合はundefinedを返す
}
//console.log(add(x, y)); // [[8, 10, 12], [14, 16, 18], [20, 22, 24]]

export function multiply(x, y) {
    // xとyが2次元配列であることを確認
    if (x.length === y.length && x[0].length === y.length) {
        return x.map(row =>
            y[0].map((x, j) =>
                row.reduce((sum, value, i) => sum + value * y[i][j], 0)
            )
        );
    }
    return undefined; // サイズが異なる場合はundefinedを返す
}

//console.log(multiply(x, y)); // [[74, 88, 102], [139, 164, 189], [204, 240, 276]]