
export function bitCount(r_integer) {

    let bit_count = 0;
    let bit_target = 1;

    for (let i = 0; i < 32; i++) {
        //����������bit������1�ł��鐮����p�ӂ���
        bit_target = 1 << i;

        //����������bit�̘_���ς�0�ȊO�ɂȂ�΂��̃r�b�g��1�ł���̂ŁAbit_count���C���N�������g����
        if (r_integer & bit_target) bit_count++;
    }

    return bit_count;
}

