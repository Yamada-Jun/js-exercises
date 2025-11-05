import { fetchSumOfFileSizes_Promise_all } from './index.js';

describe("ch13_ex10", () => {
    test("fetchSumOfFileSizes_Promise_allのテスト", async () => {
        const totalSize = await fetchSumOfFileSizes_Promise_all("./ch12/ex06/test");
        // testディレクトリ内の全ファイルサイズの合計が40バイトであること
        expect(totalSize).toBe(40);
    })
});

