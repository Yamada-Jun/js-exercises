import { primes } from './index.js';
import prime from 'prime-number'; //prime-numberパッケージを使用して素数判定を行う

describe("ch12_ex04", () => {
    test("1000個目までの値が素数かどうか判定する", () => {
        const gen = primes();
        for (let i = 0; i < 1000; i++) {
            const value = gen.next().value;
            expect(prime(value)).toBe(true);
        }
    });
});

