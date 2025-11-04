//P363 の filter() 関数
// 指定したiterableをフィルタ下反復可能なオブジェクトを返す
// predicateがtrueを返す要素だけを反復する
function filter(iterable, predicate) {
    let iterator = iterable[Symbol.iterator]();
    return {
        [Symbol.iterator]() { return this; },
        next() {
            while(true) {
                let v = iterator.next();
                if (v.done || predicate(v.value)) {
                    return v;
                }
            }
        }
    };
}

//整数列を返すジェネレータ
export function* integer() {
    // 最小の素数は2なので2から始める
    let x = 2;
    while (true) {
        yield x++;
    }
}

export function* primes() {
    let it = integer(); // 2から始まる整数の無限シーケンス
    while (true) {
        let prime = it.next().value; // 次の素数を取得
        yield prime;                 // 素数を返す
        // 素数の倍数をフィルタリング
        it = filter(it, x => x % prime !== 0);
    }
}


//let primes_gen = primes();
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);
//console.log(primes_gen.next().value);