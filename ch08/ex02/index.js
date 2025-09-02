export const power_recursion = (x, n) => {
    let result = 0;
    // 0乗は1
    if (n == 0) {
        return 1;
    }
    // xが0なら0
    if (x == 0) {
        return 0;
    }
    // 1乗はその数自身
    if (n == 1) {
        return x;
    }
    if (n % 2 == 0) {
        // nが偶数の時
        if (n == 2) {
            result = x * x;
        } else {
            result = power_recursion(x, n / 2);
            result = result * result;
        }
    } else {
        // nが奇数の時
        // n-1して偶数の時を計算
        if ((n - 1) == 2) {
            result = x * x;
        } else {
            result = power_recursion(x, (n - 1) / 2);
            result = result * result;
        }
        //さらに1回xをかける
        result = result * x;
    }
    return result;
}

export const power_loop = (x, n) => {
    let result = x;
    // 0乗は1
    if (n == 0) {
        return 1;
    }
    // xが0なら0
    if (x == 0) {
        return 0;
    }
    // 1乗はその数自身
    if (n == 1) {
        return x;
    }
    if (n % 2 == 0) {
        // nが偶数の時
        for (let i = 0; i < n / 2 - 1; i++) {
            result = result * x;
        }
        result = result * result;
    } else {
        // nが奇数の時
        // n-1して偶数の時を計算
        for (let i = 0; i < (n - 1) / 2 - 1; i++) {
            result = result * x;
        }
        result = result * result;
        //さらに1回xをかける
        result = result * x;
    }
    return result;
}

console.log(power_loop(2, 3));