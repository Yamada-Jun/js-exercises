import { readdir_promise, stat_promise } from './index.js';

describe("ch13_ex03", () => {
    test("存在するディレクトリを指定したときファイル/ディレクトリ名の配列が返ること", async () => {
        const files1 = await readdir_promise("./ch12/ex06/test");
        expect(files1).toEqual([
            "test1",
            "test2",
            "test3"
        ]);
        const files2 = await stat_promise("./ch12/ex06/test");
        //ディレクトリであることを確認
        expect(files2.isFile()).toBe(false);
        expect(files2.isDirectory()).toBe(true);
    });
    test("存在しないディレクトリを指定したときエラーが投げられること", async () => {
        await expect(readdir_promise("./ch12/ex06/tteesstt")).rejects.toThrow();
        await expect(stat_promise("./ch12/ex06/tteesstt")).rejects.toThrow();
    });
});

