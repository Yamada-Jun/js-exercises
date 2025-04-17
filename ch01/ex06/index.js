//export const fib = (x) => {
//    if (x <= 0) {
//        return 0;
//    }
//    if (x == 1) {
//        return 1;
//    }
//    return fib(x - 1) + fib(x - 2);
//};
//ŽžŠÔ‚ª‚©‚©‚éI

export function fib(n, memo = {}) {
    if (n in memo) {
        return memo[n];
    }
    if (n <= 1) {
        return n;
    }
    memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    return memo[n];
}
