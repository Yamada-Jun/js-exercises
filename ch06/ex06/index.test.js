import { f } from "./index.js";

let proto = {
    // �v���p�e�B�������l�̃v���p�e�B �����I�u�W�F�N�g���v���g�^�C�v�Ƃ��Ď���
    1: 2,
    // �v���p�e�B����������̃v���p�e�B �����I�u�W�F�N�g���v���g�^�C�v�Ƃ��Ď���
    "string": 3,
};

// �񋓕s�\�ȃv���p�e�B��ǉ�
Object.defineProperty(proto, "enum", {
    value: 0,
    enumerable: false
});

// �񋓕s�\�ȃv���p�e�B �����I�u�W�F�N�g���v���g�^�C�v�Ƃ��Ď���
let object = Object.create(proto);

// �Ǝ��v���p�e�B��ǉ�
object.x = 4;

// �Ǝ��v���p�e�B�ŗ񋓕s�̃v���p�e�B��ǉ�
Object.defineProperty(object, "y", {
    value: 5,
    enumerable: false
});


//             �Ǝ��v���p�e�B  �p���v���p�e�B
// �񋓉�      �Z x            �Z 1,  string
//
// �񋓕s��    �Z y            �~ enum

// �Z�̃v���p�e�B�̂ݏo�͂����֐��ł��邱��

test("ch06-ex06", () => {
    expect(f(object)).toStrictEqual(['x', 'y', '1', 'string']);
});
