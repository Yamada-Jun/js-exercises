const obj1 = { x: 1 };
// ���: ������1�s�R�[�h���������Ƃňȉ��̍s�� {x: 1, y: 2} ���o�͂���邱��
obj1.y = 2;
console.log(obj1);

const obj2 = { x: 1, y: 2 };
// ���: �ȉ��̍s�ł͉����o�͂���邩�A�\�z���Ă��猋�ʂ��m�F���Ȃ���
console.log(obj1 === obj2); //=> false

export function equals(o1, o2) {
    //o1 �� o2 �� �����ɓ��� �ł���ꍇ true ��Ԃ��B
    if (o1 === o2) {
        return true;
    }
    //o1 �܂��� o2 �� null �܂��̓I�u�W�F�N�g�ȊO���w�肳�ꂽ�ꍇ false ��Ԃ� (tyepof �̕Ԃ�l�� object ���ǂ������m�F���Ȃ���)
    if ((o1 === null) || (o2 === null) || (typeof o1 !== "object") || (typeof o2 !== "object")) {
        return false;
    }
    //o1 �� o2 �̃v���p�e�B�̐�����v���Ȃ��ꍇ�� false ��Ԃ�
    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return false;
    }
    //o1 �� o2 �̃v���p�e�B�̖��O����v���Ȃ��ꍇ�� false ��Ԃ�
    for (const prop in o1) {
        if (!(prop in o2)) return false;
    }
    //o1 �� o2 �̃v���p�e�B�̊e�l�� equals �Ŕ�r���A�S�� true �Ȃ�� true ��Ԃ��A1�ł� false ������� false ��Ԃ�
    for (const prop in o1) {
        if (!equals(o1[prop], o2[prop])) return false;
    }
    return true;
}

// ���������Ȃ� true
console.log(equals(42, 42)); // true
console.log(equals(null, null)); // true

// ���������ł͂Ȃ��ꍇ�I�u�W�F�N�g�ȊO���w�肳���� false
console.log(equals({ x: 42 }, 42)); // false
console.log(equals(null, { x: 42 })); // false

// �v���p�e�B�̐��E���O����v���Ȃ���� false
console.log(equals({ x: 1 }, { y: 1 })); // false
console.log(equals({ x: 1 }, { x: 1, y: 1 })); // false

// �v���p�e�B�̊e�l�� equals �ōċA�I�ɔ�r
console.log(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10 } } })); // true
console.log(equals({ x: { y: { z: 10 } } }, { x: { y: { z: 10, w: 1 } } })); // false
