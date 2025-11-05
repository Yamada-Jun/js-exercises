import { retryWithExponentialBackoff_promise } from "./index.js";

describe("ch13_ex11", () => {
    test("retryWithExponentialBackoff_promiseのテスト", async () => {
        //3回目で成功する関数を定義
        let times = 0;
        const asyncTestFunction = async () => {
            times++;
            if (times < 3) {
                throw new Error("timeout");
            }
            return "Success";
        };
        //成功時のテスト
        const result = await retryWithExponentialBackoff_promise(asyncTestFunction, 5);
        expect(result).toBe("Success");
        //失敗時のテスト
        times = 0;
        await expect(retryWithExponentialBackoff_promise(asyncTestFunction, 1)).rejects.toThrow("timeout");
    }, 10000);//テストタイムアウトを10秒に延長
});
