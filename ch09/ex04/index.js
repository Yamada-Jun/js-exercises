
//classを使ってMagicSoldierを実装する
export class SoldierClass {
    constructor(atk) {
        if (atk <= 0) throw new Error("require : x > 0");
        this._atk = atk;
    }

    attack() {
        return (this._atk * 2);
    }
}


export class MagicSoldierClass extends SoldierClass {
    constructor(atk, mgc) {
        super(atk);
        if (mgc <= 0) throw new Error("require : x > 0");
        this._mgc = mgc;
    }

    attack() {
        return (this._atk + this._mgc);
    }
}

//prototypeを使ってMagicSoldierを実装する
export function SoldierP(atk) {
    if (atk <= 0) throw new Error("require : x > 0");
    this._atk = atk;
}

SoldierP.prototype.attack = function () {
    return this._atk * 2;
};

export function MagicSoldierP(atk, mgc) {
    SoldierP.call(this, atk); // 親コンストラクタ呼び出し
    if (mgc <= 0) throw new Error("require : x > 0");
    this._mgc = mgc;
}

// Soldierを継承
MagicSoldierP.prototype = Object.create(SoldierP.prototype);
MagicSoldierP.prototype.constructor = MagicSoldierP;
// attackメソッドをオーバーライド
MagicSoldierP.prototype.attack = function () {
    return this._atk + this._mgc;
};


// 使用例
let soldier_class = new SoldierClass(10);
let magicsoldier_class = new MagicSoldierClass(10, 6);
console.log(soldier_class.attack());      // 20
console.log(magicsoldier_class.attack()); // 16


let soldier_p = new SoldierP(10);
let magicsoldier_p = new MagicSoldierP(10, 6);
console.log(soldier_p.attack()); // 20
console.log(magicsoldier_p.attack()); // 16