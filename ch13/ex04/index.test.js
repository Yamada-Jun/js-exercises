import { fetchFirstFileSize_fspromises, fetchSumOfFileSizes_fspromises } from './index.js';

describe("ch13_ex04", () => {
    test("fetchFirstFileSize_fspromisesのテスト", () => {
        let size_ = 0;
        fetchFirstFileSize_fspromises("./ch12/ex06/test").then(size => {
            size_ = size;
        })
        //test1/test1.txtのサイズが10バイトであること
        expect(size_).toBe(10);
    })
    test("fetchSumOfFileSizes_fspromisesのテスト", () => {
        let totalSize_ = 0;
        fetchSumOfFileSizes_fspromises("./ch12/ex06/test")
            .then(totalSize => { totalSize_ = totalSize; })
        //testディレクトリ内の全ファイルサイズの合計が40バイトであること
        expect(totalSize_).toBe(40);
    })
});

