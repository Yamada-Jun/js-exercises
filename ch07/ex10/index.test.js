import { DynamicSizeArray } from "./index.js";

test("ch07_ex10", () => {
    let ary = new DynamicSizeArray();
    
    expect(ary.length()).toBe(0);   // 空の配列なのでlengthは0
    ary.push("a");
    expect(ary.get(0)).toBe("a");   // 配列のチェック
    expect(ary.length()).toBe(1);   // "a"をpushしたのでlengthは1
    ary.push("b");
    ary.push("c");
    expect(ary.get(0)).toBe("a");   // 配列のチェック
    expect(ary.get(1)).toBe("b");   // 配列のチェック
    expect(ary.get(2)).toBe("c");   // 配列のチェック
    expect(ary.length()).toBe(3);   // 3回pushしたのでlengthは3
    ary.push("d");
    ary.push("e");
    expect(ary.get(3)).toBe("d");   // 配列のチェック
    expect(ary.get(4)).toBe("e");   // 配列のチェック
    expect(ary.length()).toBe(5);   // 5回pushしたのでlengthは5(8ではない)

    ary.set(1, "b2");               // setも確認
    expect(ary.get(1)).toBe("b2");  // 配列のチェック
});
