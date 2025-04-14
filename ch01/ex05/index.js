export const abs = (x) => Math.abs(x);
export const sum = (x, y) => x + y;     //P203を参考にできる
//階乗の計算(P201を参考にできる)
export const factorial = (x) => {
    if (x <= 1)
    {
        return 1;
    }
    return x * factorial(x - 1);
};