import { point } from "./index.js";

test("ch06-ex11", () => {
    point.x = 10;
    point.y = 10;

    // 誤差を考慮した比較関数を定義(問題3.3より)
    function equal(a, b) {
        const error = 1e-10;
        return (Math.abs(a - b) < error);
    }

    expect(equal(point.y, 10)).toBe(true);
    expect(equal(point.y, 10)).toBe(true);

    // NaNを設定した場合のテスト
    expect(() => { point.x = NaN; }).toThrow(Error);
    expect(() => { point.y = NaN; }).toThrow(Error);
});
