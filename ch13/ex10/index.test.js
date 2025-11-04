import { fetchSumOfFileSizes } from './index.js';

describe("ch13_ex10", () => {
    test("fetchSumOfFileSizesのテスト", async () => {
        const totalSize = await fetchSumOfFileSizes("./ch12/ex06/test");
        // testディレクトリ内の全ファイルサイズの合計が40バイトであること
        expect(totalSize).toBe(40);
    })
});

