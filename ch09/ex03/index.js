export class PositiveNumber {
    constructor(x) {
        if (x <= 0) throw new Error("require : x > 0");
        this._x = x;
    }
    get x() {
        return this._x;
    }
    set x(ref_x) {
        if (ref_x <= 0) throw new Error("require : x > 0");
        this._x = ref_x;
    }
}

let c = new PositiveNumber(1);
//c.x = -1; //エラーになる
console.log(c.x);