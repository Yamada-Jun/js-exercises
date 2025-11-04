import { fetchFirstFileSize, fetchSumOfFileSizes } from './index.js';

describe("ch13_ex08", () => {
    test("fetchFirstFileSizeのテスト", async () => {
        const size = await fetchFirstFileSize("./ch12/ex06/test");
        // test1/test1.txtのサイズが10バイトであること
        expect(size).toBe(10);
    });
    test("fetchSumOfFileSizesのテスト", async () => {
        const totalSize = await fetchSumOfFileSizes("./ch12/ex06/test");
        // testディレクトリ内の全ファイルサイズの合計が40バイトであること
        expect(totalSize).toBe(40); 
    })
});

