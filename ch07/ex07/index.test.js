import { sort } from "./index.js";

test("ch07_ex07", () => {
    const testCases = [
        { input: [5, 2, 3, 4, 5], expected: [2, 3, 4, 5, 5] },
        { input: [9, 1, 6, 3, 7], expected: [1, 3, 6, 7, 9] },
        { input: [10, 8, 2, 4, 6], expected: [2, 4, 6, 8, 10] },
        { input: [0, -1, 3, 2, 1], expected: [-1, 0, 1, 2, 3] },
        { input: [100, 50, 75, 25, 0], expected: [0, 25, 50, 75, 100] },
        { input: [3, 3, 3, 3, 3], expected: [3, 3, 3, 3, 3] },
        { input: [7, 2, 9, 1, 5], expected: [1, 2, 5, 7, 9] },
        { input: [12, 11, 13, 10, 14], expected: [10, 11, 12, 13, 14] },
        { input: [20, 15, 25, 10, 30], expected: [10, 15, 20, 25, 30] },
        { input: [4, 6, 2, 8, 0], expected: [0, 2, 4, 6, 8] }
    ];

    testCases.forEach(({ input, expected }) => {
        expect(sort(input, (a, b) => a - b)).toStrictEqual(expected);
    });
});
