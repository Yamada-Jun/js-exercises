export function fib_while() {
    let result = [1, 1];

    while (result.length < 10) {
        result.push(result[result.length - 1] + result[result.length - 2]);
    }

    return result;
}

export function fib_do_while() {
    let result = [1, 1];

    do {
        result.push(result[result.length - 1] + result[result.length - 2]);
    }
    while (result.length < 10) 

    return result;
}
export function fib_for() {
    let result = [1, 1];

    for (let i = 2; i < 10; i++) {
        result.push(result[i - 1] + result[i - 2]);
    }

    return result;
}

console.log(fib_while());
console.log(fib_do_while());
console.log(fib_for());
