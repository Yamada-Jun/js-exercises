import { any, catching } from "./index.js";

describe("ch08_ex14", () => {
    describe("any", () => {
        const isNonZero = any(
            (n) => n > 0,
            (n) => n < 0
        );

        test("isNonZero(0) should be false", () => {
            expect(isNonZero(0)).toBe(false);
        });

        test("isNonZero(42) should be true", () => {
            expect(isNonZero(42)).toBe(true);
        });

        test("isNonZero(-0.5) should be true", () => {
            expect(isNonZero(-0.5)).toBe(true);
        });

    });
    
    describe("catching", () => {
        const safeJsonParse = catching(JSON.parse, (e) => {
            return { error: e.toString() };
        });

        test('safeJsonParse(\'{"a": 1}\') should be {a: 1}', () => {
            expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
        });

        test('safeJsonParse("{Invalid Json}") should be {error: "SyntaxError: ..."}', () => {
            const result = safeJsonParse("{Invalid Json}");
            expect(result).toHaveProperty("error");
            expect(result.error).toMatch(/SyntaxError/);
        });
    });
});
