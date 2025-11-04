export function* fibonacciSequence() {
    let x = 0, y = 1;
    for (; ;) {
        yield y;
        [x, y] = [y, x + y];  // Note: destructuring assignment
    }
}

export function fibonacciSequence_nonGenerator() {
    let x = 0, y = 1;
    // クロージャを使用して値を保持する
    return {
        next: function () {
            let temp = y;
            [x, y] = [y, x + y];
            // 無限に続くのでdoneは常にfalse
            return { value: temp, done: false };
        },
        // 反復可能にするためにSymbol.iteratorメソッドを実装
        [Symbol.iterator]: function () {
            // thisを返すことで反復可能にする
            return this;
        }
    };
}

// Yield the first n elements of the specified iterable object
export function* take(n, iterable) {
    let it = iterable[Symbol.iterator](); // Get iterator for iterable object
    while (n-- > 0) {           // Loop n times:
        let next = it.next();  // Get the next item from the iterator.
        if (next.done) return; // If there are no more values, return early
        else yield next.value; // otherwise, yield the value
    }
}

/*
// An array of the first 5 Fibonacci numbers
console.log([...take(5, fibonacciSequence())]);  // => [1, 1, 2, 3, 5]

console.log([...take(5, fibonacciSequence_nonGenerator())]);   // => [1, 1, 2, 3, 5]

let fib_func_gen = fibonacciSequence();
console.log(fib_func_gen.next().value);
console.log(fib_func_gen.next().done);
console.log(fib_func_gen.next().value);
console.log(fib_func_gen.next().done);
console.log(fib_func_gen.next().value);
console.log(fib_func_gen.next().done);
console.log(fib_func_gen.next().value);
console.log(fib_func_gen.next().done);
console.log(fib_func_gen.next().value);
console.log(fib_func_gen.next().done);
//ジェネレータは反復可能になるようにSymbol.iteratorメソッドを持つ
console.log(fib_func_gen[Symbol.iterator]());
//ジェネレータは他の反復可能な型と同じように扱える
//console.log([...fibonacciSequence()]); //終わらなくなる


let fib_func_nongen = fibonacciSequence_nonGenerator();
console.log(fib_func_nongen.next().value);
console.log(fib_func_nongen.next().done);
console.log(fib_func_nongen.next().value);
console.log(fib_func_nongen.next().done);
console.log(fib_func_nongen.next().value);
console.log(fib_func_nongen.next().done);
console.log(fib_func_nongen.next().value);
console.log(fib_func_nongen.next().done);
console.log(fib_func_nongen.next().value);
console.log(fib_func_nongen.next().done);
//ジェネレータは反復可能になるようにSymbol.iteratorメソッドを持つ
console.log(fib_func_nongen[Symbol.iterator]());
//ジェネレータは他の反復可能な型と同じように扱える
//console.log([...fibonacciSequence_nonGenerator()]); //終わらなくなる
*/