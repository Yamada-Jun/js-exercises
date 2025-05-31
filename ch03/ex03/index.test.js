import { equal } from "./index.js";

describe("Equal", () => {
    it("2 個の数値を受け取り、それらの値が同値かどうかを判定する", () => {
        expect(true).toBe(equal(0.3 - 0.2, 0.1));
        expect(true).toBe(equal(0.2 - 0.1, 0.1));
  });
});
