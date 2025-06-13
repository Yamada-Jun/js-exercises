
export function bitCount(r_integer) {

    let bit_count = 0;
    let bit_target = 1;

    for (let i = 0; i < 32; i++) {
        //調査したいbitだけが1である整数を用意する
        bit_target = 1 << i;

        //調査したいbitの論理積が0以外になればそのビットは1であるので、bit_countをインクリメントする
        if (r_integer & bit_target) bit_count++;
    }

    return bit_count;
}

