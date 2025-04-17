import { fib } from "./index.js";

describe("math", () => {
    describe("fib", () => {
        it("returns 0 when 0 given", () => {
            expect(fib(0)).toBe(0);
        });

        it("returns 1 when 1 given", () => {
            expect(fib(1)).toBe(1);
        });

        it("returns 5 when 5 given", () => {
            expect(fib(5)).toBe(5);
        });

        it("returns 2111485077978050 when 75  given", () => {
            expect(fib(75)).toBe(2111485077978050);
        });
    });
});
