import { walk } from './index.js';

describe("ch13_ex13", () => {
    test("walkのテスト", async() => {
        const objects = [];
        const gen = walk("./ch12/ex06/test");
        // ./ch12/ex06/testディレクトリを再帰的に探索し、結果をobjectsに格納
        for await (const p of gen) {
            objects.push(p);
        }
        expect(objects).toEqual([
            { path: './ch12/ex06/test', isDirectory: true },
            { path: 'ch12\\ex06\\test\\test1', isDirectory: true },
            { path: 'ch12\\ex06\\test\\test1\\test1.txt', isDirectory: false },
            { path: 'ch12\\ex06\\test\\test1\\test2', isDirectory: true },
            { path: 'ch12\\ex06\\test\\test1\\test2.txt', isDirectory: false },
            { path: 'ch12\\ex06\\test\\test1\\test3', isDirectory: true },
            { path: 'ch12\\ex06\\test\\test1\\test3\\test3.txt', isDirectory: false },
            { path: 'ch12\\ex06\\test\\test1\\test3.txt', isDirectory: false },
            { path: 'ch12\\ex06\\test\\test2', isDirectory: true },
            { path: 'ch12\\ex06\\test\\test2\\test2.txt', isDirectory: false },
            { path: 'ch12\\ex06\\test\\test3', isDirectory: true },
        ]);
    });
});

