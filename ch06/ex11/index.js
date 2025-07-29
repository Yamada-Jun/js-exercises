
export let point = {
    r: 0,
    theta: 0,

    get x() {
        return this.r * Math.cos(this.theta);
    },
    get y() {
        return this.r * Math.sin(this.theta);
    },
    set x(value) {
        if (isNaN(value)) {
            throw new Error();
        }
        const _y = this.y; // ���݂�y���擾,this.y���g����getter��ʂ��Čv�Z���ꂽ�l�ɂȂ��Ă��܂�
        this.r = Math.sqrt(value * value + _y * _y);
        this.theta = Math.atan2(_y, value);
    },
    
    set y(value) {
        if (isNaN(value)) {
            throw new Error();
        }
        const _x = this.x; // ���݂�x���擾
        this.r = Math.sqrt(_x * _x + value * value);
        this.theta = Math.atan2(value, _x);
    }
}

