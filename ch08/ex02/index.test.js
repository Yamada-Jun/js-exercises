import { power_recursion, power_loop } from "./index.js";

test("ch08_ex02", () => {
    // power_recursionのテスト
    expect(power_recursion(2, 3)).toBe(8);
    expect(power_recursion(2, 4)).toBe(16);
    expect(power_recursion(3, 3)).toBe(27);
    expect(power_recursion(3, 4)).toBe(81);
    expect(power_recursion(5, 0)).toBe(1); // 0乗は1
    expect(power_recursion(5, 1)).toBe(5); // 1乗はその数自身
    expect(power_recursion(0, 3)).toBe(0); // 0の3乗は0
    expect(power_recursion(0, 0)).toBe(1); // 0の0乗は1
    // power_loopのテスト
    expect(power_loop(2, 3)).toBe(8);
    expect(power_loop(2, 4)).toBe(16);
    expect(power_loop(3, 3)).toBe(27);
    expect(power_loop(3, 4)).toBe(81);
    expect(power_loop(5, 0)).toBe(1); // 0乗は1
    expect(power_loop(5, 1)).toBe(5); // 1乗はその数自身
    expect(power_loop(0, 3)).toBe(0); // 0の3乗は0
    expect(power_loop(0, 0)).toBe(1); // 0の0乗は1
});
