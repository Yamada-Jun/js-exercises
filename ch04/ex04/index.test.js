import { bitCount } from "./index.js";

test("ch04-ex04", () => {
    expect(bitCount(0b111)).toStrictEqual(3);
    expect(bitCount(0b1111111111111111111111111111111)).toStrictEqual(31);
    expect(bitCount(0b1111111111111110111111111111111)).toStrictEqual(30);
    expect(bitCount(0)).toStrictEqual(0);
});
