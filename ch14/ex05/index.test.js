import { template } from './index.js';

describe("ch14_ex05", () => {
    test("テンプレートリテラルの確認", () => {
        expect(template``).toBe("");
        expect(template`test`).toBe("test");
        expect(template`Hello, ${"A"}`).toBe("Hello, string");
        expect(template`${1} ${null} ${() => { }}`).toBe("number object function");
        expect(template`type of 'A' is ${"A"}`).toBe("type of 'A' is string");
        expect(template`type of '10n**100n' is ${10n ** 100n}`).toBe("type of '10n**100n' is bigint");
        expect(template`type of 'false' is ${false}`).toBe("type of 'false' is boolean");
        expect(template`type of 'Symbol' is ${Symbol()}`).toBe("type of 'Symbol' is symbol");
    });
});

