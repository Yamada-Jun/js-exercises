import { fibonacciSequence, fibonacciSequence_nonGenerator, take } from './index.js';

describe("ch12_ex02", () => {
    test("", () => {
        //fibonacciSequenceとfibonacciSequence_nonGeneratorの結果の比較
        let fib_gen = fibonacciSequence();
        let fib_nongen = fibonacciSequence_nonGenerator();
        for (let i = 0; i < 10; i++) {
            let val_gen = fib_gen.next();
            let val_nongen = fib_nongen.next();
            expect(val_gen.value).toBe(val_nongen.value);
            expect(val_gen.done).toBe(val_nongen.done);
        }

        //反復可能かの確認（[Symbol.iterator]() を呼んだときに自身が返るか）
        expect(fib_gen[Symbol.iterator]()).toBe(fib_gen);
    });
});

