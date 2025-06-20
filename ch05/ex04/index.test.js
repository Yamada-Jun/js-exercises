import { fib_while, fib_do_while, fib_for } from "./index.js";

test("ch05-ex04", () => {
    expect(fib_while()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    expect(fib_do_while()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    expect(fib_for()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
});


