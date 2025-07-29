import { pop, push,shift, unshift, sort } from "./index.js";

test("ch07_ex05", () => {
    const seq = [1, 2, 3, 4, 5];

    expect(pop(seq)).toStrictEqual([1, 2, 3, 4]);           // popの確認
    expect(push(seq, 6)).toStrictEqual([1, 2, 3, 4, 5, 6]); // pushの確認
    expect(shift(seq)).toStrictEqual([2, 3, 4, 5]);         // shiftの確認
    expect(unshift(seq, 0)).toStrictEqual([0, 1, 2, 3, 4, 5]); // unshiftの確認
    expect(sort(seq, (a, b) => b - a)).toStrictEqual([5, 4, 3, 2, 1]); // sortの確認

    expect(seq).toStrictEqual([1, 2, 3, 4, 5]); // 元の配列は変更されていない
});
