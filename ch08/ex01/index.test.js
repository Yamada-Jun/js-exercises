import { f1, f2, f3 } from "./index.js";

test("ch08_ex01", () => {

    // f1のテスト
    console.log = jest.fn(); // console.logをモック化
    expect(f1(3, "a")).toEqual(["a", "a", "a"]);
    expect(console.log).toHaveBeenCalledTimes(3); // console.logが3回呼ばれたことを確認
    expect(f1(2, 5)).toEqual(["5", "5"]);
    expect(console.log).toHaveBeenCalledTimes(5); // console.logが5回呼ばれたことを確認
    // f2のテスト
    expect(f2(3)).toBe(9);
    expect(f2(-4)).toBe(16);
    // f3のテスト
    const result = f3();
    expect(result).toHaveProperty("now");
    expect(result.now).toBeInstanceOf(Date);
});
