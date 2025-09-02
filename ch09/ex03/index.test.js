import { PositiveNumber } from "./index.js"; // ts でも可

test("ch09_ex03", () => {
    // 正の値で初期化できること
    const p = new PositiveNumber(1);
    expect(p.x).toBe(1);
    // 正の値に変更できること
    p.x = 2;
    expect(p.x).toBe(2);
    // 負の値に変更しようとするとエラーになること
    expect(() => (p.x = -1)).toThrow("require : x > 0");
    // 負の値で初期化しようとするとエラーになること
    expect(() => new PositiveNumber(-1)).toThrow("require : x > 0");
});
