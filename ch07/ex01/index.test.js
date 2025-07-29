import { add, multiply } from "./index.js";

test("ch07_ex01", () => {
    
    const x = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];
    const y = [
        [7, 8, 9],
        [10, 11, 12],
        [13, 14, 15]
    ];

    expect(add(x, y)).toStrictEqual([[8, 10, 12], [14, 16, 18], [20, 22, 24]]);
    expect(multiply(x, y)).toStrictEqual([[66, 72, 78], [156, 171, 186], [246, 270, 294]]);
    expect(add(x, [[1, 2], [3, 4]])).toBeUndefined(); // サイズが異なる場合はundefinedを返す
    expect(multiply(x, [[1, 2, 3], [3, 4, 5]])).toBeUndefined(); // サイズが異なる場合はundefinedを返す
});
