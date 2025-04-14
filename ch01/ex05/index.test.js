import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
    describe("abs", () => {
        it("returns same value when positive value given", () => {
            expect(abs(42)).toBe(42);
        });

        it("returns negated value when negative value given", () => {
            expect(abs(-42)).toBe(42);
        });

        it("returns zero value when zero given", () => {
            expect(abs(0)).toBe(0);
        });
    });

    // 以下に sum, factorial のテストを記載せよ
    describe("sum", () => {
        it("returns the correct sum of two positive integers", () => {
            expect(sum(1, 2)).toBe(3);
        });

        it("returns the correct sum of two negative integers", () => {
            expect(sum(-1, -2)).toBe(-3);
        });

        it("returns the correct sum of a positive and a negative integer", () => {
            expect(sum(1, -2)).toBe(-1);
        });
    });

    describe("factorial", () => {
        it("returns 1 when 0 given", () => {
            expect(factorial(0)).toBe(1);
        });

        it("returns 1 when 1 given", () => {
            expect(factorial(1)).toBe(1);
        });

        it("returns 2 when 2 given", () => {
            expect(factorial(2)).toBe(2);
        });

        it("returns 6 when 3 given", () => {
            expect(factorial(3)).toBe(6);
        });

        it("returns 24 when 4 given", () => {
            expect(factorial(4)).toBe(24);
        });
    });
});
