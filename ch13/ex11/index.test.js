import { retryWithExponentialBackoff_promise } from "./index.js";

describe("ch13_ex11", () => {
    test("retryWithExponentialBackoff_promiseのテスト", async () => {
        let attempt = 0;
        const asyncFunction = async () => {
            attempt++;
            if (attempt < 3) {
                throw new Error();
            }
            return "Success";
        };
        const result = await retryWithExponentialBackoff_promise(asyncFunction, 5, 10);
        expect(result).toBe("Success");
    });
});