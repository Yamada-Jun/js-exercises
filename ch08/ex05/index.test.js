import { sequenceToObject } from "./index.js";

test("ch08_ex05", () => {

    // sequenceToObjectのテスト
    expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
    expect(sequenceToObject("x", 10, "y", 20, "z", 30)).toEqual({ x: 10, y: 20, z: 30 });
    expect(() => sequenceToObject("a", 1, "b")).toThrow(Error);
    expect(() => sequenceToObject("a", 1, 2, 3)).toThrow(Error);
    expect(() => sequenceToObject("a", 1, 2, "b")).toThrow(Error);
    expect(() => sequenceToObject(1, "a", 2, "b")).toThrow(Error);
    expect(() => sequenceToObject("a", "b", "c")).toThrow(Error);
    expect(() => sequenceToObject()).toThrow(Error);
});
