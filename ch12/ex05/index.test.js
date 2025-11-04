import { readLines } from './index.js';

describe("ch12_ex05", () => {
    test("readLinesのテスト", () => {
        const lines = [];
        const gen = readLines("./ch12/ex05/text.txt");
        for (let i = 0; i < 5; i++) {
            lines.push(gen.next().value);
        }
        expect(lines).toEqual([
            "test1",
            "test2",
            "test3",
            "test4"
        ]);
    });
});

