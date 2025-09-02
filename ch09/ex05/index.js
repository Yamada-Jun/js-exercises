
export function instanceOf(object, constructor) {
    let proto = Object.getPrototypeOf(object);
    while (proto !== null) {                    // proto��null�ɂȂ�܂ŌJ��Ԃ�
        if (proto === constructor.prototype) {  // prototype����v������true��Ԃ�
            return true;
        }
        proto = Object.getPrototypeOf(proto);   // ���̃v���g�^�C�v���擾
    }
    return false;
}