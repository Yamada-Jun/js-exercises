export const abs = (x) => Math.abs(x);
export const sum = (x, y) => x + y;     //P203���Q�l�ɂł���
//�K��̌v�Z(P201���Q�l�ɂł���)
export const factorial = (x) => {
    if (x <= 1)
    {
        return 1;
    }
    return x * factorial(x - 1);
};