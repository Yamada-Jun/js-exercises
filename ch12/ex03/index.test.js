import { ResetCounter } from './index.js';

describe("ch12_ex03", () => {
    test("ResetCounterのテスト", () => {
        const counter = ResetCounter();
        expect(counter.next().value).toBe(0);
        expect(counter.next().value).toBe(1);
        expect(counter.next().value).toBe(2);

        counter.throw();
        expect(counter.next().value).toBe(0);
        expect(counter.next().value).toBe(1);

        counter.throw();
        expect(counter.next().value).toBe(0);
    });
});
