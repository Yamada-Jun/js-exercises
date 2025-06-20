import { f } from "./index.js";

test("ch05-ex05", () => {
    const o = { x: 1, y: 2, z: 3 };
    expect(f(o)).toStrictEqual({ y: 2 });
    expect(o).toStrictEqual({ x: 1, y: 2, z: 3 });
});

